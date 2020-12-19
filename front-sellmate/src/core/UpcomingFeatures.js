import React from "react";
import "./core.css";

const UpcomingFeatures = ({
  title = "Check out the upcoming exciting features to be added",
  features = "lists",
}) => {
  return (
    <div className="upcoming-features-div">
      <div className="upcoming-features-items">
        <div className="upcoming-features-headline">
          <h3>{title}</h3>
        </div>
        <div className="upcoming-features-list">
          <ul>
            <li>Users can buy-sell their pets as well</li>
            <li>Pets up for adoption</li>
            <li>
              Users can write about their pet experieces and connect with others
            </li>
            <li>Education on pet maintenance</li>
          </ul>
          <p>Wohh! that's a lot</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingFeatures;
