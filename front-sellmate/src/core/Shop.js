import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { API } from "../config";
import { getProducts, getCategories } from "./APICore";
import Card from "./Card";
import CheckBox from "./Checkbox";
import { prices } from "./FixedPrices";
import RadioBox from "./RadioBox";

const Shop = () => {
  //States
  const [myFilters, setMyFilters] = useState({
    filters: { categoty: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  //load those data we gor from backend and useEffect

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  //handleFilter method

  const handleFilters = (filters, filterBy) => {
    const newFilters = {
      ...myFilters,
    };
    newFilters.filters[filterBy] = filters;
    if (filterBy == "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    setMyFilters = newFilters;
  };

  //HandlePrice method

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  //Return
  return (
    <Layout
      title="Sellmate"
      description="An e-commerce site for pets (may be)"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter By categories</h4>
          <ul>
            <CheckBox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Price Range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">Right Bar</div>
      </div>
    </Layout>
  );
};

export default Shop;
