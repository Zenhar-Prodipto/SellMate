import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { API } from "../config";
import { getProducts } from "./APICore";
import HomeCard from "./HomeCard";
import Search from "./Search";
import UpcomingFeatures from "./UpcomingFeatures";
import Footer from "./Footer";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      console.log(data);
      if (error) {
        console.log(error);
        setError(error);
      } else {
        // console.log(data.list);
        console.log(data);
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Home"
      description="An e-commerce site for pets"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-3">
            <HomeCard product={product} />
          </div>
        ))}
      </div>

      <UpcomingFeatures />

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, index) => (
          <div key={index} className="col-lg-4 col-md-6  mb-3">
            <HomeCard product={product} />
          </div>
        ))}
      </div>
      {/* <Footer /> */}
    </Layout>
  );
};
export default Home;
