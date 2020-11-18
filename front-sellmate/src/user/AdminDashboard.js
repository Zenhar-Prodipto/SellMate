import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const AdminLinks = () => {
    return (
      <div className="card mb-5 ">
        <h3 className="card-header">Info</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/create/category">Create Category</Link>
          </li>
          <li className="list-group-item">
            <Link to="/create/product">Create product</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders">Order List</Link>
          </li>
        </ul>
      </div>
    );
  };

  const AdminInfo = () => {
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

  return (
    <Layout
      title="Dashboard"
      description={`${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{AdminLinks()}</div>

        <div className="col-9">{AdminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
