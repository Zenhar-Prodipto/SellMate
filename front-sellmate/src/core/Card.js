import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({ product, showViewProductButton = true }) => {
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <button className="btn btn-outline-primary mr-2 ml-2">
          View Product
        </button>
      )
    );
  };
  return (
    <div className="card">
      <div className="card-header">{product.name}</div>
      <div className="card-body">
        <ShowImage item={product} url="product"></ShowImage>
        <p>{product.description.substring(0, 100)}</p>
        <p>${product.price}</p>

        <Link to={`/product/${product._id}`}>
          {showViewButton(showViewProductButton)}
        </Link>
        <button className="btn btn-outline-warning mt-2 mb-2">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;
