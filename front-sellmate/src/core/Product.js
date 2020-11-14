import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { API } from "../config";
import { read } from "./APICore";
import Card from "./Card";
import Search from "./Search";

const Product = (props) => {
  //states
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  //Load Functions

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
      }
    });
  };

  useEffect(() => {
    //Need to grab the productId for loadSingleProduct()
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, []);
  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        {product && product.description && (
          <Card product={product} showViewProductButton={false} />
        )}
      </div>
    </Layout>
  );
};

export default Product;
