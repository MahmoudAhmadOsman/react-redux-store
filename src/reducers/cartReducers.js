import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";
//export const cartReducer = (state = {}, action) =>
export const cartReducer = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action
) => {
  //Now implement switch case
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cartItems: action.payload.cartItems,
      };

    //Remote from cart
    case REMOVE_FROM_CART:
      return {
        cartItems: action.payload.cartItems,
      };

    default:
      return state;
  }
};

//Got to Cart.js and connect it to the Redux store
