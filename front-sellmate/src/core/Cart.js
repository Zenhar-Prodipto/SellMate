import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart, removeItem } from "./CartHelpers";
import CartCard from "./CartCard";
import Checkout from "./Checkout";
// css
import "./core_css/cart.css";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, index) => (
          <CartCard
            key={index}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
          />
        ))}
      </div>
    );
  };
  const noItemMessage = () => {
    <h2>
      You have no item in the cart. <br /> But you can keep on exploring
      <Link to="/shop">Continue Shopping</Link>
    </h2>;
  };

  return (
    <Layout
      title="CART"
      description="Check your cart out!"
      className="container-fluid"
    >
      <div className="row mb-5">
        <div className="col-4 all-cart-items">
          {items.length > 0 ? showItems(items) : noItemMessage()}
        </div>
        <div className="col-1"></div>
        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
