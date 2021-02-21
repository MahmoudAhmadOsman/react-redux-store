import { CREATE_ORDER, CLEAR_CART, CLEAR_ORDER } from "../types";

//ORDER POST action API
export const createOrder = (order) => (dispatch) => {
  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: CREATE_ORDER,
        payload: data,
      });
      localStorage.clear("cartItems");
      dispatch({
        type: CLEAR_CART,
      });
    });
};

//CLEAR CLEAR_ORDER Action
export const clearOrder = () => (dispatch) => {
  dispatch({
    type: CLEAR_ORDER,
  });
};
//Now, create orderReducers inside the reducers folder
