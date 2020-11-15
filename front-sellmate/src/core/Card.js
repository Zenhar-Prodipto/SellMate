import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";

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

  const showAddToCartButton = () => {
    return (
      <Link to={`/product/${product._id}`}>
        <button className="btn btn-outline-warning mt-2 mb-2">
          Add to cart
        </button>
      </Link>
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill mr-2"> In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Outta Stock</span>
    );
  };

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        <ShowImage item={product} url="product"></ShowImage>
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added On: {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}

        <Link to={`/product/${product._id}`}>
          {showViewButton(showViewProductButton)}
        </Link>

        {showAddToCartButton()}
      </div>
    </div>
  );
};

export default Card;
