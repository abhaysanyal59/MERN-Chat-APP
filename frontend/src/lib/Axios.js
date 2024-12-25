import axios from "axios";

const baseURL =
  process.env.REACT_APP_API_URL || // Custom API URL for development
  (process.env.NODE_ENV === "development" 
    ? "http://localhost:5001/api" // Default for local development
    : "/api"); // Relative path for production

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

console.log("Axios baseURL:", baseURL); // Debugging log
