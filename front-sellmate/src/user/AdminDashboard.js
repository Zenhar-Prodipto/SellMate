import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";

//CSS
import "./user_css/admin-dashboard.css";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const AdminLinks = () => {
    return (
      <div className="card admin-links-card ">
        <h3 className="card-header admin-links-header">Info</h3>
        <ul className="list-group admin-links-list-group">
          <li className="list-group-item admin-links-list-group-item">
            <Link to={`/category/create/${_id}`}>Create Category</Link>
          </li>
          <li className="list-group-item admin-links-list-group-item">
            <Link to="/create/product">Create product</Link>
          </li>
          <li className="list-group-item admin-links-list-group-item">
            <Link to="/admin/orders">Order List</Link>
          </li>
          <li className="list-group-item admin-links-list-group-item">
            <Link to="/admin/products">Manage products</Link>
          </li>
        </ul>
      </div>
    );
  };

  const AdminInfo = () => {
    return (
      <div className=" card admin-info-card">
        <h3 className="card-header admin-info-header ">Admin Info</h3>
        <ul className="list-group admin-info-list-group">
          <li className="list-group-item admin-info-list-group-item">{name}</li>
          <li className="list-group-item admin-info-list-group-item">
            {email}
          </li>
          <li className="list-group-item admin-info-list-group-item">
            {role === 0 ? "User" : "Admin"}
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
        <div className="col-3">{AdminLinks()}</div>

        <div className="col-9">{AdminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
