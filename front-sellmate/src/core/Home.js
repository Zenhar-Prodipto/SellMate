import React from "react";
import Layout from "./Layout";
import { API } from "../config";

const Home = () => (
  <Layout title="Sellmate" description="An e-commerce site for pets (may be)">
    {API}
  </Layout>
);
export default Home;
