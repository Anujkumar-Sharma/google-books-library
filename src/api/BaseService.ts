import axios from "axios";
import CONST from "../constants/app.constant";

const BaseService = axios.create({
  timeout: 60000,
  baseURL: CONST.GOOGLE_BOOK_API,
});

BaseService.interceptors.request.use(
  (config) => {
    // Implement authentication token logic
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

BaseService.interceptors.response.use(
  (response) => response,
  (error) => {
    // Implement unauthenticated or API error logic

    return Promise.reject(error);
  }
);

export default BaseService;
