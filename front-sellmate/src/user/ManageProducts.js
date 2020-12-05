import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { API } from "../config";
import { getProductList, removeProduct } from "../admin/APIAdmin";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();
  //load functions

  const loadGetProductList = () => {
    getProductList().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const loadRemoveProduct = (productId) => {
    removeProduct(user._id, token, productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadGetProductList();
      }
    });
  };
  useEffect(() => {
    loadGetProductList();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description="CRUD operations on products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr />
          <ul className="list-group">
            {products.map((product, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{product.name}</strong>

                <Link to={`/admin/product/update/${product._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <span
                  onClick={() => loadRemoveProduct(product._id)}
                  className="badge badge-danger badge-pill"
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
