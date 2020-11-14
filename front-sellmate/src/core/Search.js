import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { API } from "../config";
import { getProducts, list, getCategories } from "./APICore";
// import { getCategories } from "../admin/APIAdmin";

import Card from "./Card";

// STATES
const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [], //Search results will be in this category
    searched: false,
  });

  //DESTRUCTURE
  const { categories, category, search, results, searched } = data;

  //LOAD FUNCTIONS

  const loadCategories = () => {
    getCategories().then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchedMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `${results.length} products found`;
    }
    if (searched && results.length < 1) {
      return `No Products Found`;
    }
  };
  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchedMessage(searched, results)}</h2>
        <div className="row">
          {results.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      </div>
    );
  };

  //SEARCH FORM RELATED FUNCTIONS

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };
  const searchSubmit = (event) => {
    event.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  //SEARCH FORM
  const searchForm = () => (
    <form onSubmit={searchSubmit} className="form-control">
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">Pick a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search By Name"
          ></input>
        </div>
        <div className="input-group-append">
          <button className="input-group-text">search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container">{searchForm()}</div>
      <div className="container-fluid">{searchedProducts(results)}</div>
    </div>
  );
};
export default Search;

// ============================================
