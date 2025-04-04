import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8080/api/",
  baseURL: "https://paubra.onrender.com/api/",
  headers: { "Content-type": "application/json" },
  withCredentials: true,
});

export default axiosInstance;
