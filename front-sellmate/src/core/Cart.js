import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart, removeItem } from "./CartHelpers";
import Card from "./Card";

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
          <Card
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
      description="An e-commerce site for pets (may be)"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemMessage()}
        </div>

        <div className="col-6">Checkout</div>
      </div>
    </Layout>
  );
};

export default Cart;
