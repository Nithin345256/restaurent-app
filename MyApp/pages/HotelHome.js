import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  ImageBackground,
  Image,
  Switch,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import { Picker } from "@react-native-picker/picker";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HotelDashboard({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [isRegistered, setIsRegistered] = useState(false);
  const [hotel, setHotel] = useState(null);
  const [commonMenuItems, setCommonMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Hotel Registration Form
  const [hotelForm, setHotelForm] = useState({
    name: "",
    place: "",
    address: "",
    lat: "",
    long: "",
    options: [],
    photo: null,
  });

  // Menu Item Form
  const [menuForm, setMenuForm] = useState({
    name: "",
    category: "",
    foodType: "veg",
    price: "",
    thaliEligible: false,
    type: "single",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log('Fetching hotel details...');

      // Check if hotel is registered
      const hotelRes = await api.get("/hotels/my-hotel/details");

      console.log('Hotel response:', hotelRes.data);

      // Backend returns hotel directly, not wrapped in { hotel: ... }
      if (hotelRes.data) {
        setIsRegistered(true);
        setHotel(hotelRes.data);
        console.log('Hotel found:', hotelRes.data.name);
      }

      // Fetch common menu items
      console.log('Fetching common menu items...');
      const commonRes = await api.get("/common-menu");
      console.log('Common items response:', commonRes.data);

      setCommonMenuItems(commonRes.data || []);

    } catch (error) {
      console.error("Fetch error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      if (error.response?.status === 404) {
        // Hotel not found - this is expected for new hotel users
        console.log('No hotel registered yet for this user');
        setIsRegistered(false);
        setHotel(null);
      } else if (error.message === 'Network Error') {
        Alert.alert(
          'Connection Error',
          'Cannot reach server. Please check your internet connection and ensure the backend is running.',
          [
            { text: 'Retry', onPress: fetchData },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
      } else {
        // Other errors
        Alert.alert(
          'Error',
          error.response?.data?.message || 'Failed to load data'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "We need access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setHotelForm({ ...hotelForm, photo: result.assets[0] });
    }
  };

const handleRegisterHotel = async () => {
  // Validate all required fields
  if (!hotelForm.name || !hotelForm.address || !hotelForm.place) {
    Alert.alert("Error", "Please fill all required fields");
    return;
  }

  if (hotelForm.options.length === 0) {
    Alert.alert("Error", "Please select at least one option (Veg/Non-Veg)");
    return;
  }

  if (!hotelForm.photo) {
    Alert.alert("Error", "Please select a restaurant photo");
    return;
  }

  setSubmitting(true);
  try {
    const formData = new FormData();
    formData.append("name", hotelForm.name);
    formData.append("place", hotelForm.place);
    formData.append("address", hotelForm.address);
    formData.append("lat", hotelForm.lat || "0");
    formData.append("long", hotelForm.long || "0");
    formData.append("options", JSON.stringify(hotelForm.options));

    const photo = hotelForm.photo;
    const uriParts = photo.uri.split('.');
    const fileExtension = uriParts[uriParts.length - 1].toLowerCase();

    let mimeType = "image/jpeg"; // Default
    if (fileExtension === 'png') mimeType = "image/png";
    else if (fileExtension === 'jpg' || fileExtension === 'jpeg') mimeType = "image/jpeg";
    else if (fileExtension === 'gif') mimeType = "image/gif";
    else if (fileExtension === 'webp') mimeType = "image/webp";

    // Append the photo with the correct structure
    formData.append("photo", {
      uri: photo.uri,
      type: mimeType,
      name: photo.fileName || `hotel_${Date.now()}.${fileExtension}`,
    });

    console.log("Sending FormData:", {
      name: hotelForm.name,
      place: hotelForm.place,
      address: hotelForm.address,
      lat: hotelForm.lat,
      long: hotelForm.long,
      options: hotelForm.options,
      photo: {
        uri: photo.uri,
        type: mimeType,
        name: photo.fileName || `hotel_${Date.now()}.${fileExtension}`,
      },
    });

    // Send the request
    const response = await api.post("/hotels", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("Hotel registered successfully:", response.data);

    setIsRegistered(true);
    setHotel(response.data.hotel);

    Alert.alert("Success", "Hotel registered successfully!");

    // Reset form
    setHotelForm({
      name: "",
      place: "",
      address: "",
      lat: "",
      long: "",
      options: [],
      photo: null,
    });

    await fetchData();
  } catch (error) {
    console.error("Register error:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);

    let errorMessage = "Failed to register hotel";
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message.includes('Network request failed')) {
      errorMessage = 'Network error. Please check your connection and ensure backend is running.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    Alert.alert("Error", errorMessage);
  } finally {
    setSubmitting(false);
  }
};
  const handleAddCommonItem = async (commonItemId, itemName) => {
    Alert.prompt(
      "Set Price",
      `Enter price for ${itemName}:`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Add",
          onPress: async (price) => {
            if (!price || isNaN(parseFloat(price))) {
              Alert.alert("Error", "Please enter a valid price");
              return;
            }
            try {
              const response = await api.post(
                `/hotels/add-common-item/${commonItemId}`,
                { price: parseFloat(price) }
              );
              setHotel(response.data.hotel);
              Alert.alert("Success", "Item added to your menu!");
            } catch (error) {
              Alert.alert("Error", error.response?.data?.message || "Failed to add item");
            }
          },
        },
      ],
      "plain-text"
    );
  };

  const toggleOption = (option) => {
    setHotelForm((prev) => ({
      ...prev,
      options: prev.options.includes(option)
        ? prev.options.filter((opt) => opt !== option)
        : [...prev.options, option],
    }));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Loading..." showLogout={true} onLogout={logout} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#E23744" />
        </View>
        <Footer />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Hotel Dashboard" showLogout={true} onLogout={logout} />
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
        }}
        style={styles.background}
        blurRadius={3}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {!isRegistered ? (
            // Hotel Registration Form
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Register Your Restaurant</Text>
              <Text style={styles.cardSubtitle}>Fill in the details to get started</Text>

              <TextInput
                style={styles.input}
                placeholder="Restaurant Name *"
                placeholderTextColor="#9CA3AF"
                value={hotelForm.name}
                onChangeText={(text) => setHotelForm({ ...hotelForm, name: text })}
              />

              <TextInput
                style={styles.input}
                placeholder="Place/City *"
                placeholderTextColor="#9CA3AF"
                value={hotelForm.place}
                onChangeText={(text) => setHotelForm({ ...hotelForm, place: text })}
              />

              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Full Address *"
                placeholderTextColor="#9CA3AF"
                value={hotelForm.address}
                onChangeText={(text) => setHotelForm({ ...hotelForm, address: text })}
                multiline
                numberOfLines={3}
              />

              <View style={styles.coordinateRow}>
                <TextInput
                  style={[styles.input, styles.coordinateInput]}
                  placeholder="Latitude"
                  placeholderTextColor="#9CA3AF"
                  value={hotelForm.lat}
                  onChangeText={(text) => setHotelForm({ ...hotelForm, lat: text })}
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.input, styles.coordinateInput]}
                  placeholder="Longitude"
                  placeholderTextColor="#9CA3AF"
                  value={hotelForm.long}
                  onChangeText={(text) => setHotelForm({ ...hotelForm, long: text })}
                  keyboardType="numeric"
                />
              </View>

              <Text style={styles.label}>Restaurant Type *</Text>
              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={[styles.optionButton, hotelForm.options.includes("veg") && styles.optionButtonActive]}
                  onPress={() => toggleOption("veg")}
                >
                  <Text style={[styles.optionText, hotelForm.options.includes("veg") && styles.optionTextActive]}>
                    Veg
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.optionButton, hotelForm.options.includes("nonveg") && styles.optionButtonActive]}
                  onPress={() => toggleOption("nonveg")}
                >
                  <Text style={[styles.optionText, hotelForm.options.includes("nonveg") && styles.optionTextActive]}>
                    Non-Veg
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Restaurant Photo</Text>
              {hotelForm.photo ? (
                <Image source={{ uri: hotelForm.photo.uri }} style={styles.preview} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoPlaceholderText}>No photo selected</Text>
                </View>
              )}

              <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                <Text style={styles.photoButtonText}>Choose Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
                onPress={handleRegisterHotel}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Register Restaurant</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            // Hotel Dashboard
            <>
              {/* Hotel Info Card */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{hotel.name}</Text>
                <Text style={styles.infoText}>{hotel.address}, {hotel.place}</Text>
                <View style={styles.optionsRow}>
                  {hotel.options.map((opt) => (
                    <View key={opt} style={opt === "veg" ? styles.vegBadge : styles.nonVegBadge}>
                      <Text style={opt === "veg" ? styles.vegText : styles.nonVegText}>
                        {opt === "veg" ? "Veg" : "Non-Veg"}
                      </Text>
                    </View>
                  ))}
                </View>
                {hotel.photo && <Image source={{ uri: hotel.photo }} style={styles.hotelImage} />}
              </View>

              {/* Add Menu Item Card */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Add Menu Item</Text>
                <Text style={styles.cardSubtitle}>Photo will be added by admin</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Item Name *"
                  placeholderTextColor="#9CA3AF"
                  value={menuForm.name}
                  onChangeText={(text) => setMenuForm({ ...menuForm, name: text })}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Category (e.g., Main Course, Starters) *"
                  placeholderTextColor="#9CA3AF"
                  value={menuForm.category}
                  onChangeText={(text) => setMenuForm({ ...menuForm, category: text })}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Price *"
                  placeholderTextColor="#9CA3AF"
                  value={menuForm.price}
                  onChangeText={(text) => setMenuForm({ ...menuForm, price: text })}
                  keyboardType="numeric"
                />

                <Text style={styles.label}>Food Type</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={menuForm.foodType}
                    onValueChange={(value) => setMenuForm({ ...menuForm, foodType: value })}
                    style={styles.picker}
                  >
                    <Picker.Item label="Veg" value="veg" />
                    <Picker.Item label="Non-Veg" value="nonveg" />
                  </Picker>
                </View>

                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>Available in Thali</Text>
                  <Switch
                    value={menuForm.thaliEligible}
                    onValueChange={(value) => setMenuForm({ ...menuForm, thaliEligible: value })}
                    trackColor={{ false: "#D1D5DB", true: "#FCA5A5" }}
                    thumbColor={menuForm.thaliEligible ? "#E23744" : "#F3F4F6"}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
                  onPress={handleAddMenuItem}
                  disabled={submitting}
                >
                  {submitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.submitButtonText}>Add to Menu</Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* Current Menu Card */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Your Menu</Text>
                {hotel.menu?.length > 0 ? (
                  hotel.menu.map((item) => (
                    <View key={item._id} style={styles.menuItem}>
                      {item.photo && <Image source={{ uri: item.photo }} style={styles.menuItemImage} />}
                      <View style={styles.menuItemInfo}>
                        <Text style={styles.menuItemName}>{item.name}</Text>
                        <Text style={styles.menuItemDetails}>
                          {item.category} • {item.foodType} • Rs.{item.price}
                        </Text>
                        {item.thaliEligible && (
                          <Text style={styles.thaliTag}>Available in Thali</Text>
                        )}
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>No menu items yet</Text>
                )}
              </View>

              {/* Common Menu Items Card */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Add Common Items</Text>
                <Text style={styles.cardSubtitle}>Quick add popular items to your menu</Text>
                {commonMenuItems.length > 0 ? (
                  commonMenuItems.map((item) => (
                    <View key={item._id} style={styles.commonItem}>
                      {item.photo && <Image source={{ uri: item.photo }} style={styles.commonItemImage} />}
                      <View style={styles.commonItemInfo}>
                        <Text style={styles.commonItemName}>{item.name}</Text>
                        <Text style={styles.commonItemDetails}>{item.foodType}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.addCommonButton}
                        onPress={() => handleAddCommonItem(item._id, item.name)}
                      >
                        <Text style={styles.addCommonButtonText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>No common items available</Text>
                )}
              </View>
            </>
          )}
        </ScrollView>
      </ImageBackground>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  background: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#111827",
    marginBottom: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  coordinateRow: {
    flexDirection: "row",
    gap: 12,
  },
  coordinateInput: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginTop: 4,
  },
  optionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  optionButtonActive: {
    backgroundColor: "#E23744",
    borderColor: "#E23744",
  },
  optionText: {
    color: "#374151",
    fontWeight: "700",
    fontSize: 16,
  },
  optionTextActive: {
    color: "#FFFFFF",
  },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  photoPlaceholder: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
  },
  photoPlaceholderText: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  photoButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E23744",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  photoButtonText: {
    color: "#E23744",
    fontSize: 16,
    fontWeight: "700",
  },
  submitButton: {
    backgroundColor: "#E23744",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    shadowColor: "#E23744",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: "#FCA5A5",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  infoText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  vegBadge: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#10B981",
  },
  vegText: {
    color: "#047857",
    fontSize: 12,
    fontWeight: "600",
  },
  nonVegBadge: {
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E23744",
  },
  nonVegText: {
    color: "#E23744",
    fontSize: 12,
    fontWeight: "600",
  },
  hotelImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginTop: 12,
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "600",
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  menuItemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  menuItemDetails: {
    fontSize: 14,
    color: "#6B7280",
  },
  thaliTag: {
    fontSize: 12,
    color: "#E23744",
    fontWeight: "600",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 16,
    paddingVertical: 20,
  },
  commonItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  commonItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  commonItemInfo: {
    flex: 1,
  },
  commonItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  commonItemDetails: {
    fontSize: 14,
    color: "#6B7280",
  },
  addCommonButton: {
    backgroundColor: "#E23744",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addCommonButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});