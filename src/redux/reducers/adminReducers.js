import {
  CREATE_ADMIN_FAIL,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_RESET,
  CREATE_ADMIN_SUCCESS,
  GET_ADMIN_FAIL,
  GET_ADMIN_REQUEST,
  GET_ADMIN_SUCCESS,
  DELETE_ADMIN_FAIL,
  DELETE_ADMIN_REQUEST,
  DELETE_ADMIN_RESET,
  DELETE_ADMIN_SUCCESS,
  UPDATE_ADMIN_FAIL,
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_RESET,
  UPDATE_ADMIN_SUCCESS,
} from "../constants/adminConstants";

export const createAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ADMIN_REQUEST:
      return { loading: true };
    case CREATE_ADMIN_SUCCESS:
      return { loading: false, success: true };
    case CREATE_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_ADMIN_RESET:
      return {};
    default:
      return state;
  }
};

export const getAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ADMIN_REQUEST:
      return { loading: true };
    case GET_ADMIN_SUCCESS:
      return { loading: false, success: true, admin: action.payload.data };
    case GET_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_REQUEST:
      return { loading: true };
    case UPDATE_ADMIN_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_ADMIN_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ADMIN_REQUEST:
      return { loading: true };
    case DELETE_ADMIN_SUCCESS:
      return { loading: false, success: true };
    case DELETE_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_ADMIN_RESET:
      return {};
    default:
      return state;
  }
};
