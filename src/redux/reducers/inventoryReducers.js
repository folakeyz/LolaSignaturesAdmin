import {
  GET_INVENTORY_FAIL,
  GET_INVENTORY_REQUEST,
  GET_INVENTORY_SUCCESS,
} from "../constants/inventoryConstants";

export const getInventoryReducer = (
  state = { customer: [], products: [], orders: [], inc0me: 0, category: [] },
  action
) => {
  switch (action.type) {
    case GET_INVENTORY_REQUEST:
      return { loading: true, ...state };
    case GET_INVENTORY_SUCCESS:
      return {
        loading: false,
        customer: action.payload.data,
        products: action.payload.products,
        orders: action.payload.orders,
        income: action.payload.income,
        category: action.payload.category,
      };
    case GET_INVENTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
