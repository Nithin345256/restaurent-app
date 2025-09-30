import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { api } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!firstName || !secondName || !email || !phoneNumber || !password) {
      Alert.alert("Error", "All fields are required");
      return false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }

    // Match backend schema: 7-15 characters, digits with optional +, spaces, or hyphens
    const phoneRegex = /^\+?[\d\s-]{7,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid phone number (7-15 digits, optional +, spaces, or hyphens)");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }

    if (!["user", "hotel"].includes(role)) {
      Alert.alert("Error", "Please select a valid role");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await api.post("/auth/register", {
        firstName,
        secondName,
        email,
        phoneNumber,
        password,
        role,
      });

      Alert.alert(
        "Success",
        response.data.message || "Registration successful! Please login.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );
    } catch (error) {
      console.error("Registration error:", {
        message: error.message,
        config: error.config,
        response: error.response?.data,
      });
      const errorMessage =
        error.response?.data?.message ||
        (error.message.includes("Network Error")
          ? "Cannot connect to server. Please check your network or server status."
          : "Registration failed. Please try again.");
      Alert.alert("Registration Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Create Account" />
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#6B7280"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="Second Name"
          placeholderTextColor="#6B7280"
          value={secondName}
          onChangeText={setSecondName}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#6B7280"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number (e.g., +919876543210 or 9876543210)"
          placeholderTextColor="#6B7280"
          value={phoneNumber}
          onChangeText={setPhoneNumber} // Allow +, spaces, hyphens
          keyboardType="phone-pad"
          maxLength={15}
        />

        <TextInput
          style={styles.input}
          placeholder="Password (min 6 characters)"
          placeholderTextColor="#6B7280"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select Role:</Text>
          <Picker
            selectedValue={role}
            style={styles.picker}
            onValueChange={(itemValue) => setRole(itemValue)}
          >
            <Picker.Item label="Customer" value="user" />
            <Picker.Item label="Restaurant/Hotel" value="hotel" />
          </Picker>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Creating Account..." : "Register"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.linkWrap}
        >
          <Text style={styles.registerText}>
            Already have an account? <Text style={styles.link}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  subtitle: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
    color: "#111827",
    padding: 14,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  label: {
    fontSize: 14,
    color: "#374151",
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 4,
    fontWeight: "500",
  },
  picker: {
    height: 50,
    color: "#111827",
  },
  button: {
    backgroundColor: "#E23744",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#F87171",
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  linkWrap: {
    marginTop: 16,
    alignItems: "center",
  },
  registerText: {
    color: "#374151",
    fontSize: 14,
  },
  link: {
    color: "#E23744",
    fontWeight: "600",
  },
});