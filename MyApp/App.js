import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Login from "./pages/LoginScreen";
import Register from "./pages/RegisterScreen";
import UserHome from "./pages/UserHome";
import HotelDetails from "./pages/HotelDetails";
import OrderConfirmation from "./pages/OrderConfirmation";
import HotelHome from "./pages/HotelHome";
import AdminDashboard from "./pages/AdminDashboard";

const Stack = createNativeStackNavigator();

// User Navigation Stack
function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="UserHome"
    >
      <Stack.Screen name="UserHome" component={UserHome} />
      <Stack.Screen name="HotelDetails" component={HotelDetails} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
    </Stack.Navigator>
  );
}

// Hotel Navigation Stack
function HotelStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HotelHome"
    >
      <Stack.Screen name="HotelHome" component={HotelHome} />
    </Stack.Navigator>
  );
}

// Admin Navigation Stack
function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AdminDashboard"
    >
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    </Stack.Navigator>
  );
}

// Auth Stack (Login/Register)
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

// Main App Navigator
function AppNavigator() {
  const { user, isLoading } = useContext(AuthContext);

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E23744" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user ? (
        // No user logged in - show auth screens
        <AuthStack />
      ) : user.role === "user" ? (
        // User role - show user screens
        <UserStack />
      ) : user.role === "hotel" ? (
        // Hotel role - show hotel screens
        <HotelStack />
      ) : user.role === "admin" ? (
        // Admin role - show admin screens
        <AdminStack />
      ) : (
        // Unknown role - fallback to auth
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

// Main App Component
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});