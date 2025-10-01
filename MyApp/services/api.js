import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://10.177.21.127:8000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // Increased timeout for file uploads
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // CRITICAL FIX: For React Native FormData
      if (config.data instanceof FormData) {
        // Don't set Content-Type - React Native will handle it
        delete config.headers["Content-Type"];
        delete config.headers["content-type"];
        
        // IMPORTANT: Don't stringify or transform FormData
        config.transformRequest = [(data) => data];
        
        // Ensure proper headers for multipart
        config.headers["Accept"] = "application/json";
      } else {
        config.headers["Content-Type"] = "application/json";
      }

      return config;
    } catch (error) {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
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
      console.error("No response from server:", error.message);
    } else {
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;