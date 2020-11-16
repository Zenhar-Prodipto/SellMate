import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart, removeItem } from "./CartHelpers";
import Card from "./Card";
import { isAuthenticated } from "../auth";

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextvalue) => {
      return currentValue + nextvalue.count * nextvalue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Checkout</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-success">signin to checkout</button>
      </Link>
    );
  };

  return (
    <div>
      <h2>total: ${getTotal()}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
