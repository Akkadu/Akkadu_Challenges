import axios from "../Config/axios";
import {
  GET_PRODUCT_FAILED,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_REVIEW_FAILED,
  GET_PRODUCT_REVIEW_REQUEST,
  GET_PRODUCT_REVIEW_SUCCES,
  GET_PRODUCT_SUCCES,
  PRODUCT_REVIEW_REMOVE_REQUEST,
  PRODUCT_REVIEW_REMOVE_SUCCES,
  PRODUCT_REVIEW_REMOVE_FAILED,
  PRODUCT_UPDATE_REVIEW_REQUEST,
  PRODUCT_UPDATE_REVIEW_SUCCES,
  PRODUCT_UPDATE_REVIEW_FAILED,
} from "./constant";

export const getProduct = async (dispatch, review, _id) => {
  dispatch({
    type: GET_PRODUCT_REQUEST,
  });
  try {
    let { data } = await axios.get("/");
    dispatch({
      type: GET_PRODUCT_SUCCES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const saveReview = async (dispatch, review, _id) => {
  dispatch({
    type: GET_PRODUCT_REVIEW_REQUEST,
  });
  try {
    let { data } = await axios.patch("/add-review", { review, _id });
    dispatch({
      type: GET_PRODUCT_REVIEW_SUCCES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_REVIEW_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateReview = async (dispatch, review, _id,index) => {
  dispatch({
    type: PRODUCT_UPDATE_REVIEW_REQUEST,
  });
  try {
    let { data } = await axios.patch("/update-review", { review, _id,index });
    dispatch({
      type: PRODUCT_UPDATE_REVIEW_SUCCES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_REVIEW_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteReview = async (dispatch, index, _id) => {
  dispatch({
    type: PRODUCT_REVIEW_REMOVE_REQUEST,
  });
  try {
    let { data } = await axios.delete(`/delete-review/${_id}/${index}`);
    console.log(data,'action js')
    dispatch({
      type: PRODUCT_REVIEW_REMOVE_SUCCES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_REMOVE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
