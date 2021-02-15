// import { FETCH_PRODUCTS } from "../types";
// //st:3
// export const productReducer = (state, {}, action) => {
//   //Check all actions here
//   switch (action.type) {
//     case FETCH_PRODUCTS:
//       return { item: action.payload };
//     default:
//       return state;
//   }
// };

import { FETCH_PRODUCTS } from "../types";

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { items: action.payload };
    default:
      return state;
  }
};
