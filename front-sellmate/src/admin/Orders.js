import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./APIAdmin";
import { Link } from "react-router-dom";

import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, SetStatusValues] = useState([]);

  //grabbing the userId and token
  const { user, token } = isAuthenticated();
  //load functions
  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusvalues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        SetStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusvalues();
  }, []);

  //Handle No orders
  const lengthOfOrders = (orders) => {
    if (orders.length > 0) {
      return <h1>Total Orders: {orders.length}</h1>;
    } else {
      return <h1>No orders</h1>;
    }
  };

  //SHOWINPUT FUNCTION

  const showInput = (key, value) => {
    <div className="input-group mb-2 mr-2">
      <div className="input-gtoup-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>;
  };

  //handleStatusChange()
  const handleStatusChange = (event, orderId) => {
    updateOrderStatus(user._id, token, orderId, event.target.value).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          loadOrders();
        }
      }
    );
  };
  //Show Order Status function

  const showStatus = (order) => {
    <div className="form-group">
      <h3 className="mark mb-4">Status: {order.status}</h3>

      <select
        className="form-control"
        onChange={(event) => handleStatusChange(event, order._id)}
      >
        <option>Update status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>;
  };
  return (
    <Layout
      title="List Of Orders"
      description="An e-commerce site for pets (may be)"
      className="container
              col-md-8
              offset-md-2"
    >
      <div className="row">
        <div className="col-8 offset md-2">
          {lengthOfOrders(orders)}

          {orders.map((order, Oindex) => {
            return (
              <div
                className="mt-5"
                key={Oindex}
                style={{ borderBottom: "5px solid darked" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary"> Order ID: {order._id} </span>
                </h2>

                <ul className="list-group mb-2">
                  <li className="list-group-item">
                    Order Status:{showStatus(order)}
                  </li>
                  <li className="list-group-item">
                    transaction ID: {order.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: ${order.amount}</li>
                  <li className="list-group-item">User ID: {order.user._id}</li>
                  <li className="list-group-item">
                    Ordered By: {order.user.name}
                  </li>
                  <li className="list-group-item">
                    Ordered On: {moment(order.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery Address: {order.address}
                  </li>
                </ul>

                <h3> Total products in the order:{order.products.length}</h3>

                {order.map((product, PIndex) => (
                  <div
                    className="mb-4"
                    key={PIndex}
                    style={{ padding: "20px", border: "2px solid darked" }}
                  >
                    {showInput("Product Name:", product.name)}
                    {showInput("Product Price:", product.price)}
                    {showInput("Total Product:", product.count)}
                    {showInput("Product ID:", product._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
