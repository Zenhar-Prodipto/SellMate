// import React, { useState, useEffect } from "react";
// import Layout from "../core/Layout";
// import { isAuthenticated } from "../auth";
// import { getCategories, getSingleProduct, updateProduct } from "./APIAdmin";
// import { Link, Redirect } from "react-router-dom";
// import AddCategory from "./AddCategory";

// //States
// const UpdateProduct = ({ match }) => {
//   const [values, setValues] = useState({
//     name: "",
//     description: "",
//     price: "",
//     categories: [],
//     category: "",
//     shipping: "",
//     quantity: "",
//     photo: "",
//     loading: false,
//     error: "",
//     createdProduct: "",
//     redirectToProfile: false,
//     formData: "",
//   });

//   //Destructuring the states
//   const {
//     name,
//     description,
//     price,
//     categories,
//     category,
//     shipping,
//     quantity,
//     loading,
//     error,
//     createdProduct,
//     redirectToProfile,
//     formData,
//   } = values;

//   //destructuring isAuthenticated()
//   const { user, token } = isAuthenticated();

//   //Load functions

//   const loadGetSingleProduct = (productId) => {
//     getSingleProduct(productId).then((data) => {
//       if (data.error) {
//         setValues({ ...values, error: data.error });
//       } else {
//         setValues({
//           ...values,
//           name: data.name,
//           description: data.description,
//           price: data.price,
//           category: data.category._id,
//           shipping: data.shipping,
//           quantity: data.quantity,
//           formData: new FormData(),
//         });
//         loadCategories();
//       }
//     });
//   };

//   const loadCategories = () => {
//     getCategories(token).then((data) => {
//       console.log(data);
//       if (data.error) {
//         setValues({ ...values, error: data.error });
//       } else {
//         setValues({
//           categories: data.list,
//           formData: new FormData(),
//         });
//       }
//     });
//   };

//   useEffect(() => {
//     loadGetSingleProduct(match.params.productId);
//   }, []);
//   //handleChange function of the newProductForm

//   const handleChange = (name) => (event) => {
//     const value = name === "photo" ? event.target.files[0] : event.target.value;
//     formData.set(name, value);
//     setValues({ ...values, [name]: value });
//   };
//   //clickSubmit method of newProductionForm

//   const clickSubmit = (event) => {
//     event.preventDefault();
//     setValues({ ...values, error: "", loading: true });
//     updateProduct(match.params.productId, user._id, token, formData).then(
//       (data) => {
//         if (data.error) {
//           setValues({ ...values, error: data.error });
//         } else {
//           setValues({
//             ...values,
//             name: "",
//             description: "",
//             photo: "",
//             price: "",
//             quantity: "",
//             loading: false,
//             redirectToProfile: true,
//             createdProduct: data.name,
//           });
//         }
//       }
//     );
//   };

//   const redirectToProfilefunc = () => {
//     if (redirectToProfile) {
//       if (!error) {
//         return <Redirect to="/admin/products" />;
//       }
//     }
//   };

//   //Product Form
//   const updateProductForm = () => (
//     <form className="mb-3" onSubmit={clickSubmit}>
//       <h4>Upload a photo</h4>

//       <div className="form-group">
//         <label className="btn btn-secondary">
//           <input
//             onChange={handleChange("photo")}
//             type="file"
//             name="photo"
//             accept="image/*"
//           />
//         </label>
//       </div>

//       <div className="form-group">
//         <label className="">Name </label>
//         <input
//           onChange={handleChange("name")}
//           className="form-control"
//           type="text"
//           name={name}
//         />
//       </div>

//       <div className="form-group">
//         <label className="">Description </label>
//         <textarea
//           onChange={handleChange("description")}
//           className="form-control"
//           name={description}
//         />
//       </div>

//       <div className="form-group">
//         <label className="">price </label>
//         <input
//           onChange={handleChange("price")}
//           className="form-control"
//           type="Number"
//           name={price}
//         />
//       </div>

//       <div className="form-group">
//         <label className="">Category </label>
//         <select onChange={handleChange("category")} className="form-control">
//           <option>Select a category</option>
//           {categories &&
//             categories.map((category, index) => (
//               <option key={index} value={category._id}>
//                 {category.name}
//               </option>
//             ))}
//         </select>
//       </div>

//       <div className="form-group">
//         <label className="">Shipping </label>
//         <select onChange={handleChange("shipping")} className="form-control">
//           <option>Select a shipping option</option>
//           <option value="0"> No</option>
//           <option value="1"> Yes</option>
//         </select>
//       </div>

//       <div className="form-group">
//         <label className="">quantity </label>
//         <input
//           onChange={handleChange("quantity")}
//           className="form-control"
//           type="Number"
//           name={quantity}
//         />
//       </div>

//       <button className="btn btn-outline-primary">Update Product</button>
//     </form>
//   );
//   const showError = () => (
//     <div
//       className="alert alert-danger"
//       style={{ display: error ? "" : "none" }}
//     >
//       {error}
//     </div>
//   );

//   const showSuccess = () => (
//     <div
//       className="alert alert-info"
//       style={{ display: createdProduct ? "" : "none" }}
//     >
//       <h2>{`updated successuflly`}</h2>
//     </div>
//   );

//   const showLoading = () =>
//     loading && (
//       <div className="alert alert-success">
//         <h3>Loading....</h3>
//       </div>
//     );

//   return (
//     <Layout
//       title="Update Product"
//       description="An e-commerce site for pets (may be)"
//       className="container
//           col-md-8
//           offset-md-2"
//     >
//       <div className="row">
//         <div className="col-md-8 offset-md-2">
//           {showLoading()}
//           {showSuccess()}
//           {showError()}
//           {updateProductForm()}
//           {redirectToProfilefunc()}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default UpdateProduct;

// =================================================================================================

import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { getCategories, getSingleProduct, updateProduct } from "./APIAdmin";

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: false,
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    // categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const loadGetSingleProduct = (productId) => {
    getSingleProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // populate the state
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData(),
        });
        // load categories
        initCategories();
      }
    });
  };

  // load categories and set form data
  const initCategories = () => {
    getCategories(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    loadGetSingleProduct(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            photo: "",
            price: "",
            quantity: "",
            loading: false,
            error: false,
            redirectToProfile: true,
            createdProduct: data.name,
          });
        }
      }
    );
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>

      <button className="btn btn-outline-primary">Update Product</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is updated!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/" />;
      }
    }
  };

  return (
    <Layout
      title="Sellmate"
      description={`G'day ${user.name}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {redirectUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
