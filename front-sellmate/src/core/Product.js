import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { API } from "../config";
import { read, relatedProductList } from "./APICore";
import Card from "./Card";
import Search from "./Search";
import Footer from "./Footer";

// CSS
import "./core_css/product.css";

const Product = (props) => {
  //states
  const [product, setProduct] = useState({});
  const [relatedproduct, setRelatedProduct] = useState([]);

  const [error, setError] = useState(false);

  //Load Functions

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        relatedProductList(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    //Need to grab the productId for loadSingleProduct()
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);
  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-2 view-product-ad-card "></div>
        <div className="col-6 view-product-single-product-card ">
          <h4 style={{ textAlign: "center" }} className="mb-3">
            Your Potential pet 😋
          </h4>
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>

        <div className="col-4">
          <h4 className="mb-3">Related pets</h4>
          {relatedproduct.map((prod, index) => (
            <div className="mb-3">
              <Card key={index} product={prod} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
