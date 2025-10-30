import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import { resetToLogin } from "../navigation/RootNavigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Admin credentials - hardcoded (keep in sync with backend/.env ADMIN_EMAIL / ADMIN_PASSWORD)
  // NOTE: For local development the admin login is handled locally without a backend call.
  const ADMIN_EMAIL = "admin@foodcatering.com";
  const ADMIN_PASSWORD = "Admin@123";

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");
      // Ensure token looks like a JWT (three dot-separated parts)
      const looksLikeJwt = typeof token === 'string' && token.split('.').length === 3;
      if (!looksLikeJwt) {
        await AsyncStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        return;
      }
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
      // Always authenticate via backend (admin is handled server-side via .env creds)
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

      // Return the user object
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

  // Logout relies on AppNavigator's conditional rendering to show AuthStack.
  const logoutAndNavigate = async () => {
    await logout();
    resetToLogin();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout: logoutAndNavigate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};