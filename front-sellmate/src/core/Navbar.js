import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#e600006" };
  } else {
    return { color: "#ffffff" };
  }
};

const Navbar = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-items">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          Home
        </Link>
      </li>
      <li className="nav-items">
        <Link
          className="nav-link"
          style={isActive(history, "/signin")}
          to="/signin"
        >
          SignIn
        </Link>
      </li>
      <li className="nav-items">
        <Link
          className="nav-link"
          style={isActive(history, "/signup")}
          to="/signup"
        >
          SignUp
        </Link>
      </li>
    </ul>
  </div>
);

export default withRouter(Navbar);
