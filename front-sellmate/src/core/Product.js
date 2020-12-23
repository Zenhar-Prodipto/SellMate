import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { API } from "../config";
import { read, relatedProductList } from "./APICore";
import HomeCard from "./HomeCard";
import Search from "./Search";
import Footer from "./Footer";

// CSS
import "./core_css/product.css";

const Product = (props) => {
  //states
  const [product, setProduct] = useState({});
  const [relatedproduct, setRelatedProduct] = useState([]);
  const [closeAdButton, setCloseAdButton] = useState(1);
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

  const showAdd = () =>
    closeAdButton && (
      <div className="col-2 view-product-ad-card ">
        <button
          onClick={clickCloseAd}
          type="button"
          class="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );

  const clickCloseAd = (event) => {
    event.preventDefault();
    setCloseAdButton({ closeAdButton: 0 });
    console.log("Click kora hoise");
  };

  // const hideAdd = () => !closeAdButton && <div className="col-2 "></div>;
  const hideAdd = () => {
    if (closeAdButton == 1) {
      return (
        <div className="col-2 view-product-ad-card ">
          <button
            onClick={clickCloseAd}
            type="button"
            class="close"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    } else {
      return <div className="col-2 "></div>;
    }
  };
  // const isLoggedIn = this.state.isLoggedIn;
  // let button;
  // if (isLoggedIn) {
  //   button = <LogoutButton onClick={this.handleLogoutClick} />;
  // } else {
  //   button = <LoginButton onClick={this.handleLoginClick} />;
  // }

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        {hideAdd()}
        <div className="col-6 view-product-single-product-card ">
          <h4 style={{ textAlign: "center" }} className="mb-3">
            Your Potential pet 😋
          </h4>
          {product && product.description && (
            <HomeCard product={product} showViewProductButton={false} />
          )}
        </div>

        <div className="col-4">
          <h4 className="mb-3">Related pets</h4>
          {relatedproduct.map((prod, index) => (
            <div className="mb-3">
              <HomeCard key={index} product={prod} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
