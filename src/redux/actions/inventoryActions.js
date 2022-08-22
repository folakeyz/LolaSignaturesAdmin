import axios from "axios";
import {
  GET_INVENTORY_FAIL,
  GET_INVENTORY_REQUEST,
  GET_INVENTORY_SUCCESS,
} from "../constants/inventoryConstants";
import { USER_LOGOUT } from "../constants/userConstants";

export const getInventory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_INVENTORY_REQUEST });

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
    const { data } = await axios.get("/api/inventory", config);

    dispatch({
      type: GET_INVENTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_INVENTORY_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
  }
};
