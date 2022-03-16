import axios, { AxiosInstance } from "axios";

console.log(process.env.NODE_ENV === "development");

export const authUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/spotify/auth"
    : "https://shuffling-extravaganza.herokuapp.com/spotify/auth";

export const api: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/"
      : "https://shuffling-extravaganza.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});
