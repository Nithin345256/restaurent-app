import React, { useContext } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from './navigation/RootNavigation';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Logo from "./components/Logo";
import LoadingLogo from "./components/LoadingLogo";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Login from "./pages/LoginScreen";
import Register from "./pages/RegisterScreen";
import UserHome from "./pages/UserHome";
import SearchScreen from "./pages/SearchScreen";
import CartScreen from "./pages/CartScreen";
// Use the cleaned replacement component after fixing the original file
import HotelDetails from "./pages/HotelDetailsNew";
import OrderConfirmation from "./pages/OrderConfirmation";
import HotelHome from "./pages/HotelHome";
import AdminDashboard from "./pages/AdminDashboard";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// User Bottom Tab Navigation
function UserTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E23744',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {/* Order determines tab positions: left -> right. Place Home in the middle. */}
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Home" component={UserHome} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}

// User Navigation Stack
function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="UserTabs"
    >
      <Stack.Screen name="UserTabs" component={UserTabs} />
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
        <LoadingLogo size={96} />
        <Text style={styles.loadingTitle}>AHAARIKA</Text>
        <ActivityIndicator size="large" color="#E23744" style={{ marginTop: 12 }} />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {!user ? (
        <AuthStack />
      ) : user.role === "user" ? (
        <UserStack />
      ) : user.role === "hotel" ? (
        <HotelStack />
      ) : user.role === "admin" ? (
        <AdminStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

// Main App Component
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingTitle: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
  },
});