import { PROD } from "@/consts/environment";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseURL = PROD ? import.meta.env.VITE_SERVER_URL : "http://localhost:3000/";

const config: AxiosRequestConfig = {
  baseURL,
};

export const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
