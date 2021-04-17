import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import {
  getProducts,
  getAllProducts,
  getCategorySpecificProducts,
  getCategories,
  getFilteredProducts,
} from "./APICore";
import { isAuthenticated } from "../auth";
import ShopCard from "./ShopCard";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [specificProducts, setSpecificProducts] = useState([]);

  const { user, token } = isAuthenticated();

  //load functions
  const loadX = () => {
    getCategorySpecificProducts().then((data) => {
      console.log(`Category Sepcific: ${data}`);
      if (data.error) {
        console.log("error");
      } else {
        setSpecificProducts(data);
      }
    });
  };

  const loadGetCategories = () => {
    getCategories(token).then((data) => {
      console.log(`getCategories: ${data}`);
      if (data.error) {
        console.log("error");
      } else {
        setCategories(data);
      }
    });
  };

  const loadGetAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAllProducts(data);
      }
    });
  };

  //   http://www.example.com/wp-json/wc/v1/products?category=${item.id}

  useEffect(() => {
    loadGetCategories();
    loadGetAllProducts();
    loadX();
  }, []);

  const showCategories = () => {
    return categories.map((c, i) => (
      <div key={i}>
        <ol className="list-unstyled">
          <li>{c.name}</li>
        </ol>
      </div>
    ));
  };

  const showProducts = () => {
    return allProducts.map((c, i) => (
      <div key={i}>
        <ol className="list-unstyled">
          <li>{c.name}</li>
        </ol>
      </div>
    ));
  };

  //   const showAll = () => {
  //     return specificProducts.map((p, i) => {
  //       <div key={i}>
  //         <h1>{p}</h1>
  //       </div>;
  //     });
  //   };
  const showAll = () => {
    return specificProducts;
  };

  return (
    <Layout title="All Categories" description="Checkout Everything">
      {showCategories()}
      {showProducts()}
      {/* {showAll()} */}
    </Layout>
  );
};

export default AllCategories;
