//========= CART ACTIONS FUNCTIONS

import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

//============== ADD_TO_CART Method

export const addToCart = (product) => (dispatch, getState) => {
  //make a clone of cart items using slice() function
  // const cartItems = items.slice();
  const cartItems = getState().cart.cartItems.slice();
  //Then loop through cart items
  let alreadyExists = false;
  cartItems.forEach((x) => {
    //If product already exists
    if (x.id === product.id) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    cartItems.push({ ...product, count: 1 });
  }

  //Now dispatch the action
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });

  //Update the local storage using setItem method(param1, param2)
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

//============== REMOVE_FROM_CART Method
export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x.id !== product.id);
  dispatch({
    type: REMOVE_FROM_CART,
    payload: {
      cartItems,
    },
  });

  //Now update the localstorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

//Go to reducers and create new cart reducer file
