import axios from "axios";
import { BASE_URL } from "./Constants";
const token = localStorage.getItem('token')

const instance = axios.create({
  baseURL:BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default instance;