import axios from "axios";
import {
  GET_DELIVERY_FAIL,
  GET_DELIVERY_REQUEST,
  GET_DELIVERY_SUCCESS,
  CREATE_DELIVERY_FAIL,
  CREATE_DELIVERY_REQUEST,
  CREATE_DELIVERY_SUCCESS,
  UPDATE_DELIVERY_FAIL,
  UPDATE_DELIVERY_REQUEST,
  UPDATE_DELIVERY_SUCCESS,
  DELETE_DELIVERY_FAIL,
  DELETE_DELIVERY_REQUEST,
  DELETE_DELIVERY_SUCCESS,
} from "../constants/deliveryConstants";

export const addDelivery = (country, fee) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_DELIVERY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/delivery",
      { country, fee },
      config
    );

    dispatch({
      type: CREATE_DELIVERY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_DELIVERY_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const getDelivery = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_DELIVERY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/delivery", config);

    dispatch({
      type: GET_DELIVERY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DELIVERY_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const editDelivery =
  (country, fee, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_DELIVERY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/delivery/${id}`,
        { country, fee },
        config
      );

      dispatch({
        type: UPDATE_DELIVERY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DELIVERY_FAIL,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

export const deleteDelivery = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_DELIVERY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/delivery/${id}`, config);

    dispatch({
      type: DELETE_DELIVERY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DELIVERY_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
