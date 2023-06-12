import * as actions from "../constants/orderConstants";
import axios from "axios";
import { logout } from "./userActions";
import API_BASE_URL from "../../config";

export const createOrder = (dataOrder) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      API_BASE_URL + "/api/orders",
      dataOrder,
      config
    );

    dispatch({ type: actions.ORDER_CREATE_SUCCESS, payload: data.order });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_CREATE_FAILED,
      payload: message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      API_BASE_URL + `/api/orders/${id}`,
      config
    );

    dispatch({ type: actions.ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_DETAILS_FAILED,
      payload: message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: actions.ORDER_PAY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        API_BASE_URL + `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({ type: actions.ORDER_PAY_SUCCESS, payload: data.order });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "not authorized, no token") {
        dispatch(logout());
      }
      dispatch({
        type: actions.ORDER_PAY_FAILED,
        payload: message,
      });
    }
  };

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_DELIVER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(
      API_BASE_URL + `/api/orders/${orderId}/deliver`,
      {},
      config
    );

    dispatch({ type: actions.ORDER_DELIVER_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_DELIVER_FAILED,
      payload: message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      API_BASE_URL + `/api/orders/myorders`,
      config
    );

    dispatch({ type: actions.ORDER_LIST_MY_SUCCESS, payload: data.orders });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_LIST_MY_FAILED,
      payload: message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(API_BASE_URL + `/api/orders/`, config);
    dispatch({ type: actions.ORDER_LIST_SUCCESS, payload: data.orders });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_LIST_FAILED,
      payload: message,
    });
  }
};
