import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getPurchaseHistory } from "./APIUser";
import moment from "moment";

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  //destructure from isAuthenticated()
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const token = isAuthenticated().token;
  const loadGetPurchaseHistory = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    loadGetPurchaseHistory(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className="card mb-5 ">
        <h3 className="card-header">Info</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/cart">My Cart</Link>
          </li>
          <li className="list-group-item">
            <Link to={`/profile/${_id}`}>Profile</Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className=" card mb-5">
        <h3 className="card-header">Info</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{role === 0 ? "User" : "Admin"}</li>
        </ul>
      </div>
    );
  };
  const purchaseHistory = (history) => {
    return (
      <div className="card col-5">
        <h3 className="card-header">Purchase History</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <h6>Product name: </h6>
            {history.map((history, index) => {
              //first we loop through history which has all the orders
              return (
                <div>
                  <hr />
                  {history.products.map((product, index) => {
                    //then we access the prodcut table of the order model
                    return (
                      <div key={index}>
                        <h6>Product name: {product.name}</h6>
                        <h6>Product price: ${product.price}</h6>
                        <h6>
                          Purchased date: {moment(product.createdAt).fromNow()}
                        </h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>

        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
