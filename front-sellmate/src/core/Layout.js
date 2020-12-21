import React from "react";
import Navbar from "./Navbar";
import "../styles.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Navbar />
    <div className="jumbotron">
      <h2 className="jumbotron-title">{title}</h2>
      <p className="lead jumbotron-description">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;

// import React from "react";
// import Navbar from "./Navbar";
// import "../styles.css";
// import layoutBg1 from "../images/layout-bg-1.jpg";
// import layoutBg2 from "../images/layout-bg-2.jpg";
// import layoutBg3 from "../images/layout-bg-3.jpg";

// const Layout = ({
//   title = "Title",
//   description = "Description",
//   className,
//   children,
// }) => (
//   <div>
//     <Navbar />
//     <div className="jumbotron">
//       <div
//         id="layout-carousel-id"
//         class="carousel slide layout-carousel"
//         data-ride="carousel"
//       >
//         <div className="carousel-text-and-bg">
//           <h2>{title}</h2>
//           <p className="lead">{description}</p>
//         </div>
//         <div class="carousel-inner">
//           <div class="carousel-item active">
//             <img class="d-block w-100" src={layoutBg1} alt="First slide" />
//           </div>
//           <div class="carousel-item">
//             <img class="d-block w-100" src={layoutBg2} alt="Second slide" />
//           </div>
//           <div class="carousel-item">
//             <img class="d-block w-100" src={layoutBg3} alt="Third slide" />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default Layout;
