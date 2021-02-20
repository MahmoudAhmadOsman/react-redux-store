// //st:3
import {
  FETCH_PRODUCTS,
  FITER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from "../types";

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FITER_PRODUCTS_BY_SIZE:
      return {
        //return the current state using spread operator
        ...state,
        size: action.payload.size,
        filteredItems: action.payload.items,
      };
    case ORDER_PRODUCTS_BY_PRICE:
      return {
        //return the current stateusing spread operator
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };

    case FETCH_PRODUCTS:
      return { items: action.payload, filteredItems: action.payload };
    default:
      return state;
  }
};
//3. Go to Filter component and use connect() function
