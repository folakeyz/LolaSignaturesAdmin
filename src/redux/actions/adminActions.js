import axios from "axios";
import {
  GET_ADMIN_FAIL,
  GET_ADMIN_REQUEST,
  GET_ADMIN_SUCCESS,
  CREATE_ADMIN_FAIL,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
  UPDATE_ADMIN_FAIL,
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_SUCCESS,
  DELETE_ADMIN_FAIL,
  DELETE_ADMIN_REQUEST,
  DELETE_ADMIN_SUCCESS,
} from "../constants/adminConstants";

export const addAdmin =
  (name, mobile, email, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_ADMIN_REQUEST });

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
        "/api/admin",
        { name, mobile, email, password },
        config
      );

      dispatch({
        type: CREATE_ADMIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ADMIN_FAIL,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

export const getAdmins = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ADMIN_REQUEST });

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
    const { data } = await axios.get("/api/admin", config);

    dispatch({
      type: GET_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const updateAdmins =
  (id, name, mobile, email, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_ADMIN_REQUEST });

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
        `/api/admin/${id}`,
        { name, mobile, email, password },
        config
      );

      dispatch({
        type: UPDATE_ADMIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ADMIN_FAIL,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

export const deleteAdmins = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ADMIN_REQUEST });

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
    const { data } = await axios.delete(`/api/admin/${id}`, config);

    dispatch({
      type: DELETE_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ADMIN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
