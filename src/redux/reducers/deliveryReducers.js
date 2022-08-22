import {
  CREATE_DELIVERY_FAIL,
  CREATE_DELIVERY_REQUEST,
  CREATE_DELIVERY_RESET,
  CREATE_DELIVERY_SUCCESS,
  GET_DELIVERY_FAIL,
  GET_DELIVERY_REQUEST,
  GET_DELIVERY_SUCCESS,
  DELETE_DELIVERY_FAIL,
  DELETE_DELIVERY_REQUEST,
  DELETE_DELIVERY_RESET,
  DELETE_DELIVERY_SUCCESS,
  UPDATE_DELIVERY_FAIL,
  UPDATE_DELIVERY_REQUEST,
  UPDATE_DELIVERY_RESET,
  UPDATE_DELIVERY_SUCCESS,
} from "../constants/deliveryConstants";

export const createDeliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_DELIVERY_REQUEST:
      return { loading: true };
    case CREATE_DELIVERY_SUCCESS:
      return { loading: false, success: true };
    case CREATE_DELIVERY_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_DELIVERY_RESET:
      return {};
    default:
      return state;
  }
};

export const getDeliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DELIVERY_REQUEST:
      return { loading: true };
    case GET_DELIVERY_SUCCESS:
      return { loading: false, success: true, deliveries: action.payload.data };
    case GET_DELIVERY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateDeliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DELIVERY_REQUEST:
      return { loading: true };
    case UPDATE_DELIVERY_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_DELIVERY_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_DELIVERY_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteDeliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DELIVERY_REQUEST:
      return { loading: true };
    case DELETE_DELIVERY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_DELIVERY_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_DELIVERY_RESET:
      return {};
    default:
      return state;
  }
};
