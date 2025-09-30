import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Admin credentials - hardcoded
  const ADMIN_EMAIL = "admin@restaurant.com";
  const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Set the token in API headers
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Check auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Check if it's admin login
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Handle admin login locally (no backend call)
        const adminUser = {
          id: "admin",
          email: ADMIN_EMAIL,
          firstName: "Admin",
          secondName: "User",
          role: "admin",
        };
        const adminToken = "admin-token-" + Date.now();

        // Save to AsyncStorage
        await AsyncStorage.setItem("token", adminToken);
        await AsyncStorage.setItem("user", JSON.stringify(adminUser));

        // Set token in API headers
        api.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;
        setUser(adminUser);
        
        // Return the admin user object
        return adminUser;
      }

      // Regular user/hotel login
      console.log('Attempting backend login for:', email);
      const response = await api.post("/auth/login", { email, password });
      console.log('Login response:', response.data);
      
      const { token, user: userData } = response.data;

      if (!token || !userData) {
        throw new Error('Invalid response from server - missing token or user data');
      }

      // Save to AsyncStorage
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      // Set token in API headers
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);
      
      console.log('Login successful, user role:', userData.role);
      
      // Return the user object - CRITICAL!
      return userData;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  };

  const register = async (firstName, secondName, email, password, role) => {
    try {
      const response = await api.post("/auth/register", {
        firstName,
        secondName,
        email,
        password,
        role,
      });
      const { token, user: userData } = response.data;

      // Save to AsyncStorage
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      // Set token in API headers
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);
      
      // Return the user object for consistency
      return userData;
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Remove from AsyncStorage
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      // Remove token from API headers
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};