import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Ensure this is HTTP, not HTTPS
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
  timeout: 10000,
});

// Add an interceptor to include the Authorization header
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken"); // Adjust the key as needed
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;