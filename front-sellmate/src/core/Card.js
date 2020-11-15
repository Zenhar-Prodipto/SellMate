import React, { useState, useEffect } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { addItem } from "./CartHelpers";
import ShowImage from "./ShowImage";
import moment from "moment";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
}) => {
  const [redirect, setRedirect] = useState(false);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <button className="btn btn-outline-primary mr-2 ml-2">
          View Product
        </button>
      )
    );
  };

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Link to={`/cart`}>
          <button
            onClick={addToCart}
            className="btn btn-outline-warning mt-2 mb-2"
          >
            Add to cart
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
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
        {shouldRedirect(redirect)}
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

        {showAddToCart(showAddToCartButton)}
      </div>
    </div>
  );
};

export default Card;
