import {
  GET_PRODUCT_FAILED,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_REVIEW_FAILED,
  GET_PRODUCT_REVIEW_REQUEST,
  GET_PRODUCT_REVIEW_SUCCES,
  GET_PRODUCT_SUCCES,
  PRODUCT_REVIEW_REMOVE_FAILED,
  PRODUCT_REVIEW_REMOVE_REQUEST,
  PRODUCT_REVIEW_REMOVE_SUCCES,
  PRODUCT_UPDATE_REVIEW_FAILED,
  PRODUCT_UPDATE_REVIEW_REQUEST,
  PRODUCT_UPDATE_REVIEW_SUCCES,
} from "./constant";

export let initialState = {
  products: {
    productloading: true,
  },
};

export function reducer(state, action) {
  switch (action.type) {
    // ====== Fething Review Cases goes here ==========
    case GET_PRODUCT_REQUEST:
      return {
        ...state,
        products: { productloading: true },
      };
    case GET_PRODUCT_SUCCES:
      return {
        ...state,
        products: { productloading: false, productData: action.payload },
      };
    case GET_PRODUCT_FAILED:
      return {
        ...state,
        products: { productloading: false, productError: action.payload },
      };

      // ====== Adding Review Cases goes here ==========
    case GET_PRODUCT_REVIEW_REQUEST:
      return {
        ...state,
        products: {
          ...state.products,
          reviewLoading: true,
        },
      };
    case GET_PRODUCT_REVIEW_SUCCES:
      const { _id, product_Review } = action.payload;
      const dispatchingReview = state.products.productData.map((productData) =>
        productData._id === _id
          ? { ...productData, product_Review: product_Review }
          : productData
      );
      return {
        ...state,
        products: {
          ...state.products,
          reviewLoading: false,
          productData: dispatchingReview,
        },
      };
    case GET_PRODUCT_REVIEW_FAILED:
      return {
        ...state,
        products: {
          ...state.products,
          reviewLoading: false,
          productError: action.payload,
        },
      };
      //  ====== Update Review Cases goes here ==========

      case PRODUCT_UPDATE_REVIEW_REQUEST:
        return {
          ...state,
          products: {
            ...state.products,
            updateReviewLoading: true,
          },
        };
        case PRODUCT_UPDATE_REVIEW_SUCCES:
          const productReviewupdate = action.payload.product_Review;
          const elementid = action.payload._id;
          const updatedReview = state.products.productData.map((productData) =>
            productData._id === elementid
              ? { ...productData, product_Review: productReviewupdate }
              : productData
          );
          return {
            ...state,
            products: {
              ...state.products,
              updateReviewLoading: false,
              productData: updatedReview,
            },
          };
        case PRODUCT_UPDATE_REVIEW_FAILED:
          return {
            ...state,
            products: {
              ...state.products,
              updateReviewLoading: false,
              updateReviewError: action.payload,
            },
          };
      // ====== Delete Review Cases goes here ==========
    case PRODUCT_REVIEW_REMOVE_REQUEST:
      return {
        ...state,
        products: {
          ...state.products,
          deleteReviewLoading: true,
        },
      };
    case PRODUCT_REVIEW_REMOVE_SUCCES:
      const productReview = action.payload.product_Review;
      const id = action.payload._id;
      const filteredReview = state.products.productData.map((productData) =>
        productData._id === id
          ? { ...productData, product_Review: productReview }
          : productData
      );
      return {
        ...state,
        products: {
          ...state.products,
          deleteReviewLoading: false,
          productData: filteredReview,
        },
      };
      case PRODUCT_REVIEW_REMOVE_FAILED:
        return {
          ...state,
          products: {
            ...state.products,
            deleteReviewLoading: false,
            deleteReviewError: action.payload,
          },
        };
    default:
      return state;
  }
}
