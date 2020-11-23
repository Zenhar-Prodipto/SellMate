// import React, { useState, useEffect } from "react";

// const CheckBox = ({ categories, handleFilters }) => {
//   const [checked, setChecked] = useState([]);

//   const handleToggle = (c) => () => {
//     //return index or -1
//     const currentCategoryId = checked.indexOf(c);
//     const newCheckedCategoryId = [...checked];

//     //if id not there then push else take off
//     if (currentCategoryId === -1) {
//       newCheckedCategoryId.push(c);
//     } else {
//       newCheckedCategoryId.splice(currentCategoryId, 1);
//     }

//     setChecked(newCheckedCategoryId);
//     handleFilters(newCheckedCategoryId);
//   };

//   return categories.map((category, index) => {
//     <li key={index} className="list-unstyled">
//       <input
//         onChange={handleToggle(category._id)}
//         value={checked.indexOf(category._id === -1)}
//         type="checkbox"
//         className="form-check-input"
//       />
//       <label className="form-check-label">{category.name}</label>
//     </li>;
//   });
// };

// export default CheckBox;

// ===================================

import React, { useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setCheked] = useState([]);

  const handleToggle = (c) => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    // console.log(newCheckedCategoryId);
    setCheked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label">{c.name}</label>
    </li>
  ));
};

export default Checkbox;
