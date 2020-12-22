import React, { useState, useEffect } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { addItem, updateItem, removeItem } from "./CartHelpers";
import ShowImage from "./ShowImage";
import moment from "moment";
// import "./core.css";
import "./core_css/card.css";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  className,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

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

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Link to={`/cart`}>
          <button
            onClick={() => removeItem(product._id)}
            className="btn btn-outline-danger mt-2 mb-2"
          >
            Remove Item
          </button>
        </Link>
      )
    );
  };

  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };
  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className="input-group mb-3">
          <div className="input-group prepend">
            <span className="input-group text">Adjust quanity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleChange(product._id)}
          />
        </div>
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
      <div className="card-header">{product.name}</div>
      <div className="card-body">
        <div className="card-image">
          {shouldRedirect(redirect)}
          <ShowImage item={product} url="product"></ShowImage>
        </div>
        <div className="card-description mb-2">
          <p className="lead  mt-2 mb-2">
            {product.description.substring(0, 300)}
          </p>
        </div>
        <div className="card-price">
          <p className="black-10">${product.price}</p>
        </div>
        <div className="card-category">
          <p className="black-9">
            Category: {product.category && product.category.name}
          </p>
        </div>
        <div className="card-createdAt">
          <p className="black-8">
            Added On: {moment(product.createdAt).fromNow()}
          </p>
        </div>
        <div className="card-quantity-and-buttons">
          {showStock(product.quantity)}
          <Link to={`/product/${product._id}`}>
            {showViewButton(showViewProductButton)}
          </Link>

          {showAddToCart(showAddToCartButton)}
          {showRemoveButton(showRemoveProductButton)}
          {showCartUpdateOptions(cartUpdate)}
        </div>
      </div>
    </div>
  );
};

export default Card;
