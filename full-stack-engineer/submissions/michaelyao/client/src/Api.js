import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

export const signup = ({ username, password }) =>
  axios.post('/auth/signup/', {
    username,
    password,
  });

export const signin = ({ username, password }) =>
  axios.post('/auth/signin/', {
    username,
    password,
  });

export const signout = () => axios.post('/auth/signout/');

export const currentUser = () => axios.get('/auth/currentUser/');

export const listProducts = () => axios.get('/products/');

export const listReviews = (productId) =>
  axios.get(`/products/${productId}/reviews`);

export const createReview = (productId, rating, text) =>
  axios.post(`/products/${productId}/reviews`, { rating, text });

export const deleteReview = (productId, reviewId) =>
  axios.delete(`/products/${productId}/reviews/${reviewId}`);

export const updateReview = (productId, reviewId) =>
  axios.patch(`/products/${productId}/reviews/${reviewId}`);
