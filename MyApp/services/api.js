import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Replace with your backend URL
const API_BASE_URL = "http://10.177.21.127:8000/api"; // e.g., http://192.168.1.100:5000/api

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to all requests
// services/api.js
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // DON'T override Content-Type if it's already set (for FormData)
    // React Native will set the correct boundary for multipart/form-data
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      delete config.headers['Content-Type']; // Let axios handle it
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;

      if (status === 401) {
        // Unauthorized - clear storage and redirect to login
        try {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");
        } catch (err) {
          console.error("Error clearing storage:", err);
        }
      }

      if (status === 404) {
        console.error("Route not found:", error.config.url);
      }

      if (status === 500) {
        console.error("Server error:", error.response.data);
      }
    } else if (error.request) {
      // Request made but no response
      console.error("No response from server:", error.message);
    } else {
      // Something else happened
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;