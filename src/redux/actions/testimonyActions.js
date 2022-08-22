import axios from "axios";
import {
  GET_TESTIMONY_FAIL,
  GET_TESTIMONY_REQUEST,
  GET_TESTIMONY_SUCCESS,
  CREATE_TESTIMONY_FAIL,
  CREATE_TESTIMONY_REQUEST,
  CREATE_TESTIMONY_SUCCESS,
  UPDATE_TESTIMONY_FAIL,
  UPDATE_TESTIMONY_REQUEST,
  UPDATE_TESTIMONY_SUCCESS,
  DELETE_TESTIMONY_FAIL,
  DELETE_TESTIMONY_REQUEST,
  DELETE_TESTIMONY_SUCCESS,
} from "../constants/testimonyConstants";

export const addTestimony = (name, msg) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_TESTIMONY_REQUEST });

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
    const { data } = await axios.post("/api/testimony", { name, msg }, config);

    dispatch({
      type: CREATE_TESTIMONY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_TESTIMONY_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const getTestimony = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TESTIMONY_REQUEST });

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
    const { data } = await axios.get("/api/testimony", config);

    dispatch({
      type: GET_TESTIMONY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TESTIMONY_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const editTestimony = (name, msg, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_TESTIMONY_REQUEST });

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
      `/api/testimony/${id}`,
      { name, msg },
      config
    );

    dispatch({
      type: UPDATE_TESTIMONY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TESTIMONY_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const deleteTestimony = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_TESTIMONY_REQUEST });

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
    const { data } = await axios.delete(`/api/testimony/${id}`, config);

    dispatch({
      type: DELETE_TESTIMONY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TESTIMONY_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
