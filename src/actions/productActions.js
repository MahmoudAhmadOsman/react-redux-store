import { FETCH_PRODUCTS } from "../types";
//st:2
export const fetchProducts = () => async (dispatch) => {
  //get data from the backend/server
  const res = await fetch("/api/products");

  //Assign the data to res variable
  const data = await res.json();
  console.log(data);

  //Now dispatch the action using dispatch function
  // dispatch(arg1, arg2)
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};
