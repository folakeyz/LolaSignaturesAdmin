import {
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_RESET,
  CREATE_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_RESET,
  DELETE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_RESET,
  UPDATE_CATEGORY_SUCCESS,
} from "../constants/categoryConstants";

export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return { loading: true };
    case CREATE_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case CREATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const getCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return { loading: true };
    case GET_CATEGORY_SUCCESS:
      return { loading: false, success: true, category: action.payload.data };
    case GET_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return { loading: true };
    case UPDATE_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return { loading: true };
    case DELETE_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
