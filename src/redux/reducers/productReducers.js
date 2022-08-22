import {
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
  UPLOAD_PRODUCT_FAIL,
  UPLOAD_PRODUCT_REQUEST,
  UPLOAD_PRODUCT_RESET,
  UPLOAD_PRODUCT_SUCCESS,
} from "../constants/productConstants";

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const uploadProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_PRODUCT_REQUEST:
      return { loading: true };
    case UPLOAD_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case UPLOAD_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case UPLOAD_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
