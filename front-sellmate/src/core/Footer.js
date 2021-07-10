import React, { memo } from "react";
import { Link, Redirect } from "react-router-dom";
import Search from "./Search";
import "./core_css/footer.css";

const Footer = () => {
  return (
    <div class="footer-main">
      <div className="footer-bg">
        <h4 class="footer-header">SellMate</h4>
        <div class="footer-flex">
          <div class="box1">
            {/* <h4 class="footer-headers">SellMate</h4> */}

            <h4>About Us</h4>
            <p>
              We get you your pet mates here
              <br></br>And let you exchange and connect
              <br></br>with other petlovers
            </p>

            <h4>Check Out The Site</h4>
            <ul>
              <li>
                <Link className="links" to="/shop">
                  Shop
                </Link>
              </li>
              <li>
                <Link className="links" to="/user/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="links" to="/cart">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div class="box2">
            <h4 className="footer-headers"></h4>
            <div className="box-2-search-text">
              <h4>Search for pets here</h4>
            </div>
            <div className="footer-search">
              <Search />
            </div>
          </div>

          <div class="box3">
            <div className="contact-us-text">
              <h4>Contact us:</h4>
            </div>
            <div class="social-media-icons">
              <ul class="">
                <li>
                  <a href="https://www.gmail.com/">
                    <i class="fa fa-email icons" aria-hidden="true"></i>Email:
                    sellmate@gmail.com{" "}
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com">
                    <i class="fa fa-facebook icons" aria-hidden="true"></i>
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com">
                    <i class="fa fa-instagram icons" aria-hidden="true"></i>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/?lang=en">
                    <i class="fa fa-twitter icons" aria-hidden="true"></i>
                    Twitter{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="big-Thank-You">
          <h2>A Big Thank You to you!</h2>
          <div className="copyright-text">Copyright © 2021</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
