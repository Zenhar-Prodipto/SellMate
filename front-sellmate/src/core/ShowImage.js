import React from "react";
import { API } from "../config";
import "./core.css";

const ShowImage = ({ item, url }) => {
  return (
    // <div className="show-image">
    <img
      className=""
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      style={{ maxHeight: "100%", maxWidth: "100%" }}
    ></img>
    // </div>
  );
};

export default ShowImage;
