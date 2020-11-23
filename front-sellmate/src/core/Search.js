// import React, { useState, useEffect } from "react";
// import Layout from "./Layout";
// import { API } from "../config";
// import { getProducts, list, getCategories } from "./APICore";
// // import { getCategories } from "../admin/APIAdmin";

// import Card from "./Card";
// import { isAuthenticated } from "../auth";

// // STATES
// const Search = () => {
//   const [data, setData] = useState({
//     categories: [],
//     category: "",
//     search: "",
//     results: [], //Search results will be in this category
//     searched: false,
//   });

//   //DESTRUCTURE
//   const { categories, category, search, results, searched } = data;
//   const { user, token } = isAuthenticated();
//   //LOAD FUNCTIONS

//   const loadCategories = () => {
//     getCategories(token).then((data) => {
//       console.log(data);
//       if (data.error) {
//         console.log(data.error);
//       } else {
//         setData({ ...data, categories: data });
//       }
//     });
//   };

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   const searchedMessage = (searched, results) => {
//     if (searched && results.length > 0) {
//       return `${results.length} products found`;
//     }
//     if (searched && results.length < 1) {
//       return `No Products Found`;
//     }
//   };
//   const searchedProducts = (results = []) => {
//     return (
//       <div>
//         <h2 className="mt-4 mb-4">{searchedMessage(searched, results)}</h2>
//         <div className="row">
//           {results.map((product, index) => (
//             <Card key={index} product={product} />
//           ))}
//         </div>
//       </div>
//     );
//   };

//   //SEARCH FORM RELATED FUNCTIONS

//   const searchData = () => {
//     if (search) {
//       list({ search: search || undefined, category: category }).then(
//         (response) => {
//           if (response.error) {
//             console.log(response.error);
//           } else {
//             setData({ ...data, results: response, searched: true });
//           }
//         }
//       );
//     }
//   };
//   const searchSubmit = (event) => {
//     event.preventDefault();
//     searchData();
//   };

//   const handleChange = (name) => (event) => {
//     setData({ ...data, [name]: event.target.value, searched: false });
//   };

//   //SEARCH FORM
//   const searchForm = () => (
//     <form onSubmit={searchSubmit} className="form-control">
//       <span className="input-group-text">
//         <div className="input-group input-group-lg">
//           <div className="input-group-prepend">
//             <select className="btn mr-2" onChange={handleChange("category")}>
//               <option value="All">Pick a category</option>
//               {categories.map((category, index) => (
//                 <option key={index} value={category._id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <input
//             type="search"
//             className="form-control"
//             onChange={handleChange("search")}
//             placeholder="Search By Name"
//           ></input>
//         </div>
//         <div className="input-group-append">
//           <button className="input-group-text">search</button>
//         </div>
//       </span>
//     </form>
//   );

//   return (
//     <div className="row">
//       <div className="container">{searchForm()}</div>
//       <div className="container-fluid">{searchedProducts(results)}</div>
//     </div>
//   );
// };
// export default Search;

// // ============================================

import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { getCategories, list } from "./APICore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { user, token } = isAuthenticated();
  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories(token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>

        <div className="row">
          {results.map((product, i) => (
            <div className="col-4 mb-3">
              <Card key={i} product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
