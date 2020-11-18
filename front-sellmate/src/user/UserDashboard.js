import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";

const Dashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

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
  const purchaseHistory = () => {
    return (
      <div className="card col-5">
        <h3 className="card-header">Purchase History</h3>
        <ul className="list-group">
          <li className="list-group-item">Purchased stuff</li>
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
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
