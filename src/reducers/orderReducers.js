import { CREATE_ORDER, CLEAR_ORDER } from "../types";

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        order: action.payload,
      };
    case CLEAR_ORDER:
      return {
        order: null,
      };
    default:
      return state;
  }
};

export { orderReducer };

//Now, add or combine this into the Reducers file to combine and add into the redux store
//then connect() oder, createOrder and clearOrder into the Cart.js file as a params
