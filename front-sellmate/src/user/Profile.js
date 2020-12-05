// import React, { useState, useEffect } from "react";
// import { Link, Redirect } from "react-router-dom";
// import Layout from "../core/Layout";
// import { read, update, updateUser, userUpdate } from "./APIUser";
// import { isAuthenticated } from "../auth";

// const Profile = ({ match }) => {
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     password: "",
//     error: false,
//     success: false,
//   });
//   const { name, email, password, error, success } = values;
//   const { token } = isAuthenticated();

//   const loadRead = (userId) => {
//     read(userId, token).then((data) => {
//       if (data.error) {
//         setValues({ ...values, error: true });
//       } else {
//         setValues({ ...values, name: data.name, email: data.email });
//       }
//     });
//   };

//   useEffect(() => {
//     loadRead(match.params.userId);
//   }, []);

//   const handleChange = (name) => (event) => {
//     setValues({ ...values, error: false, [name]: event.target.value });
//   };

//   const clickSubmit = (event) => {
//     event.preventDafault();
//     update(match.params.userId, token, { name, email, password }).then(
//       (data) => {
//         if (data.error) {
//           setValues({ ...values, error: true });
//         } else {
//           updateUser(data, () => {
//             setValues({
//               ...values,
//               name: data.name,
//               email: data.email,
//               success: true,
//             });
//           });
//         }
//       }
//     );
//   };

//   const redirectUser = (success) => {
//     if (success) {
//       return <Redirect to="/cart" />;
//     }
//   };

//   const profileUpdate = (name, email, password) => (
//     <form>
//       <div className="form-group">
//         <label className="text-muted">Name</label>
//         <input
//           type="text"
//           onChange={handleChange("name")}
//           className="form-control"
//           value={name}
//         />
//       </div>
//       <div className="form-group">
//         <label className="text-muted">Email</label>
//         <input
//           type="email"
//           onChange={handleChange("email")}
//           className="form-control"
//           value={email}
//         />
//       </div>
//       <div className="form-group">
//         <label className="text-muted">Password</label>
//         <input
//           type="password"
//           onChange={handleChange("password")}
//           className="form-control"
//           value={password}
//         />
//       </div>

//       <button onClick={clickSubmit} className="btn btn-primary">
//         Submit
//       </button>
//     </form>
//   );

//   return (
//     <Layout
//       title="Profile"
//       description="An e-commerce site for pets (may be)"
//       className="container-fluid"
//     >
//       <div className="row">
//         <div className="col-6">
//           <h1>Profile Update</h1>
//           {profileUpdate(name, email, password)}
//           {redirectUser(success)}
//         </div>
//       </div>
//     </Layout>
//   );
// };
// export default Profile;

import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./APIUser";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const { token } = isAuthenticated();
  const { name, email, password, error, success } = values;

  const init = (userId) => {
    // console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          // console.log(data.error);
          alert(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      <h2 className="mb-4">Profile update</h2>
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
