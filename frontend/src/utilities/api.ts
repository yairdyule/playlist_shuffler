import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "https://shuffling-extravaganza.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});
