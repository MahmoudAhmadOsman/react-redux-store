import {
  FETCH_PRODUCTS,
  FILER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from "../types";
//st:2

//================ ALL ACTIONS
export const fetchProducts = () => async (dispatch) => {
  //get data from the backend/server
  // const res = await fetch("/api/products");
  // https://custom-states-api.herokuapp.com/products
  const res = await fetch("https://custom-states-api.herokuapp.com/products"); //get data from custom remote api

  //Assign the data to res variable after converting into JSON
  const data = await res.json();
  console.log(data);

  //Now dispatch the action using dispatch function
  // dispatch(arg1, arg2)
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

//FILER_PRODUCTS_BY_SIZE & ORDER_PRODUCTS_BY_PRICE types

//FILER_PRODUCTS_BY_SIZE function
export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: FILER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter((x) => x.availableSizes.indexOf(size) >= 0), //Check if the size is 0
    },
  });
};

// ORDER_PRODUCTS_BY_PRICE function
export const sortProducts = (filterProducts, sort) => (dispatch) => {
  //Check the sorted products
  const sortedProducts = filterProducts.slice();
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }

  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};

//2. Go to productReducers file and define two cases for FITER_PRODUCTS_BY_SIZE and ORDER_PRODUCTS_BY_PRICE
