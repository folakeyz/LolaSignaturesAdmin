import {
  CREATE_TESTIMONY_FAIL,
  CREATE_TESTIMONY_REQUEST,
  CREATE_TESTIMONY_RESET,
  CREATE_TESTIMONY_SUCCESS,
  GET_TESTIMONY_FAIL,
  GET_TESTIMONY_REQUEST,
  GET_TESTIMONY_SUCCESS,
  DELETE_TESTIMONY_FAIL,
  DELETE_TESTIMONY_REQUEST,
  DELETE_TESTIMONY_RESET,
  DELETE_TESTIMONY_SUCCESS,
  UPDATE_TESTIMONY_FAIL,
  UPDATE_TESTIMONY_REQUEST,
  UPDATE_TESTIMONY_RESET,
  UPDATE_TESTIMONY_SUCCESS,
} from "../constants/testimonyConstants";

export const createTestimonyReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TESTIMONY_REQUEST:
      return { loading: true };
    case CREATE_TESTIMONY_SUCCESS:
      return { loading: false, success: true };
    case CREATE_TESTIMONY_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_TESTIMONY_RESET:
      return {};
    default:
      return state;
  }
};

export const getTestimonyReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TESTIMONY_REQUEST:
      return { loading: true };
    case GET_TESTIMONY_SUCCESS:
      return {
        loading: false,
        success: true,
        testimonies: action.payload.data,
      };
    case GET_TESTIMONY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateTestimonyReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TESTIMONY_REQUEST:
      return { loading: true };
    case UPDATE_TESTIMONY_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_TESTIMONY_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_TESTIMONY_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteTestimonyReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TESTIMONY_REQUEST:
      return { loading: true };
    case DELETE_TESTIMONY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_TESTIMONY_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_TESTIMONY_RESET:
      return {};
    default:
      return state;
  }
};
