import { AxiosRequestConfig } from "axios";

export const axiosConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    credentials: "include",
  },
  withCredentials: true,
};
