import { API } from "../config";
import queryString from "query-string";

export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
  })
    .then((response) => {
      console.log(response.data);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };
  return fetch(`${API}/product/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const list = (params) => {
  const query = queryString.stringify(params);

  return fetch(`${API}/products/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const read = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      console.log(response.data);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const relatedProductList = (productId) => {
  return fetch(`${API}/products/relatedproducts/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      console.log(response.data);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getBraintreeClientToken = (userId, token) => {
  return fetch(`${API}/braintree/getToken/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log(response.data);
      return response.json();
    })
    .catch((err) => console.log(err));
};
