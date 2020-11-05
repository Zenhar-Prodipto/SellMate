import React from "react";
import Layout from "../core/Layout";
import { API } from "../config";

const Signin = () => (
  <Layout
    title="Signin Page"
    description="An e-commerce site for pets (may be)"
  >
    {API}
  </Layout>
);

export default Signin;
