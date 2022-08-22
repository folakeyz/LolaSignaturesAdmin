import axios from "axios";
import {
  GET_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
} from "../constants/categoryConstants";

export const addCategory = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

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
    const { data } = await axios.post("/api/category", { name }, config);

    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const getCategory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });

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
    const { data } = await axios.get("/api/category", config);

    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const editCategory = (name, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

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
    const { data } = await axios.put(`/api/category/${id}`, { name }, config);

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

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
    const { data } = await axios.delete(`/api/category/${id}`, config);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
