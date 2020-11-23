import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";
import Shop from "./core/Shop";
import PrivateRoutes from "./auth/PrivateRoutes";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import Profile from "./user/Profile";
import AdminDashboard from "./user/AdminDashboard";
import ManageProducts from "./user/ManageProducts";
import AddCategory from "./admin/AddCategory";
import Orders from "./admin/Orders";
import AddProduct from "./admin/AddProduct";
import UpdateProduct from "./admin/UpdateProduct";
import Product from "./core/Product";
import Cart from "./core/Cart";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoutes path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoutes path="/profile/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        {/* <AdminRoute path="/create/category" exact component={AddCategory} /> */}
        <AdminRoute
          path="/category/create/:userId"
          exact
          component={AddCategory}
        />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
