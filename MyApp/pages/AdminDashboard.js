import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
  Switch,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import { Picker } from "@react-native-picker/picker";

export default function AdminDashboard({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [pendingMenuItems, setPendingMenuItems] = useState([]);
  const [commonMenuItems, setCommonMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  const [commonForm, setCommonForm] = useState({
    name: "",
    category: "",
    foodType: "veg",
    thaliEligible: false,
    photo: null,
  });

  useEffect(() => {
    if (!user?.id || user?.role !== "admin") {
      Alert.alert("Access Denied", "You do not have permission to access the admin dashboard.", [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
      setLoading(false);
      return;
    }
    fetchData();
  }, [user, navigation]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, hotelsRes, pendingRes, commonRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/hotels"),
        api.get("/admin/hotels/pending-items"),
        api.get("/admin/common-menu"),
      ]);

      setUsers(Array.isArray(usersRes.data) ? usersRes.data : usersRes.data.users || []);
      setHotels(Array.isArray(hotelsRes.data) ? hotelsRes.data : hotelsRes.data.hotels || []);
      setPendingMenuItems(Array.isArray(pendingRes.data) ? pendingRes.data : pendingRes.data.hotels || []);
      setCommonMenuItems(Array.isArray(commonRes.data) ? commonRes.data : commonRes.data.commonMenuItems || []);
    } catch (error) {
      console.error("Fetch error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "We need access to your photos.");
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      return result.assets[0];
    }
    return null;
  };

  const handleAddPhotoToMenuItem = async (hotelId, menuId) => {
    const photo = await pickImage();
    if (!photo) return;

    try {
      const formData = new FormData();
      formData.append("photo", {
        uri: photo.uri,
        type: "image/jpeg",
        name: "menu-item.jpg",
      });

      await api.post(`/admin/hotels/${hotelId}/menu/${menuId}/photo`, formData);

      Alert.alert("Success", "Photo added successfully!");
      fetchData();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to add photo");
    }
  };

  const handleDeleteHotel = async (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this hotel?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/admin/hotels/${id}`);
            Alert.alert("Success", "Hotel deleted successfully!");
            fetchData();
          } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Failed to delete hotel");
          }
        },
      },
    ]);
  };

  const handleDeleteMenuItem = async (hotelId, menuId) => {
    Alert.alert("Confirm Delete", "Delete this menu item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/admin/hotels/${hotelId}/menu/${menuId}`);
            Alert.alert("Success", "Menu item deleted!");
            fetchData();
          } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Failed to delete item");
          }
        },
      },
    ]);
  };

  const handleCreateCommonItem = async () => {
    if (!commonForm.name || !commonForm.category || !commonForm.photo) {
      Alert.alert("Error", "Please fill all fields and select a photo");
      return;
    }

    setSubmitting(true);
    try {
      console.log("=== Creating Common Item ===");
      console.log("API Base URL:", api.defaults.baseURL);
      
      const formData = new FormData();
      formData.append("name", commonForm.name.trim());
      formData.append("category", commonForm.category.trim());
      formData.append("foodType", commonForm.foodType);
      formData.append("thaliEligible", commonForm.thaliEligible ? "true" : "false");
      
      const uri = commonForm.photo.uri;
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      
      formData.append("photo", {
        uri: uri,
        name: `photo.${fileType}`,
        type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,
      });

      console.log("Submitting data:", {
        name: commonForm.name.trim(),
        category: commonForm.category.trim(),
        foodType: commonForm.foodType,
        thaliEligible: commonForm.thaliEligible,
        photoUri: uri,
      });

      const token = await AsyncStorage.getItem("token");
      
      const response = await fetch(`${api.defaults.baseURL}/admin/common-menu`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success! Response:", data);
      
      Alert.alert("Success", "Common menu item created!");
      setCommonForm({ name: "", category: "", foodType: "veg", thaliEligible: false, photo: null });
      fetchData();
    } catch (error) {
      console.error("Create common item error:", error);
      
      let errorMessage = "Failed to create item.\n\n";
      errorMessage += error.message || "Unknown error occurred";
      
      Alert.alert("Error", errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCommonItem = async (id) => {
    Alert.alert("Confirm Delete", "Delete this common item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/admin/common-menu/${id}`);
            Alert.alert("Success", "Common item deleted!");
            fetchData();
          } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Failed to delete");
          }
        },
      },
    ]);
  };

  const selectPhotoForCommon = async () => {
    const photo = await pickImage();
    if (photo) {
      setCommonForm({ ...commonForm, photo });
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: logout }
      ]
    );
  };

  if (!user?.id || user?.role !== "admin") {
    return null;
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>🍽️</Text>
            </View>
            <View style={styles.centerContent}>
              <Text style={styles.title}>Admin Dashboard</Text>
              <Text style={styles.subtitle}>Manage your platform</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#EF4444" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🍽️</Text>
          </View>
          <View style={styles.centerContent}>
            <Text style={styles.title}>Admin Dashboard</Text>
            <Text style={styles.subtitle}>Manage your platform</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "pending" && styles.tabActive]}
            onPress={() => setActiveTab("pending")}
          >
            <Text style={[styles.tabText, activeTab === "pending" && styles.tabTextActive]}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "hotels" && styles.tabActive]}
            onPress={() => setActiveTab("hotels")}
          >
            <Text style={[styles.tabText, activeTab === "hotels" && styles.tabTextActive]}>Hotels</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "users" && styles.tabActive]}
            onPress={() => setActiveTab("users")}
          >
            <Text style={[styles.tabText, activeTab === "users" && styles.tabTextActive]}>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "common" && styles.tabActive]}
            onPress={() => setActiveTab("common")}
          >
            <Text style={[styles.tabText, activeTab === "common" && styles.tabTextActive]}>Common</Text>
          </TouchableOpacity>
        </View>

        {activeTab === "pending" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Menu Items Without Photos</Text>
            {pendingMenuItems.length > 0 ? (
              pendingMenuItems.map((hotel) => (
                <View key={hotel._id} style={styles.hotelSection}>
                  <Text style={styles.hotelName}>{hotel.name}</Text>
                  {hotel.menu.filter((item) => !item.photo).map((item) => (
                    <View key={item._id} style={styles.menuItem}>
                      <View style={styles.menuItemInfo}>
                        <Text style={styles.menuItemName}>{item.name}</Text>
                        <Text style={styles.menuItemDetails}>{item.category} • {item.foodType} • ₹{item.price}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.addPhotoButton}
                        onPress={() => handleAddPhotoToMenuItem(hotel._id, item._id)}
                      >
                        <Text style={styles.addPhotoButtonText}>Add Photo</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No pending items</Text>
              </View>
            )}
          </View>
        )}

        {activeTab === "hotels" && (
          <>
            {hotels.map((hotel) => (
              <View key={hotel._id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderLeft}>
                    <Text style={styles.cardTitle}>{hotel.name}</Text>
                    <Text style={styles.hotelInfo}>{hotel.address}</Text>
                  </View>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteHotel(hotel._id)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.sectionTitle}>Menu</Text>
                {hotel.menu?.map((item) => (
                  <View key={item._id} style={styles.menuItem}>
                    {item.photo && <Image source={{ uri: item.photo }} style={styles.menuItemImage} />}
                    <View style={styles.menuItemInfo}>
                      <Text style={styles.menuItemName}>{item.name}</Text>
                      <Text style={styles.menuItemDetails}>{item.category} • ₹{item.price}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteButtonSmall}
                      onPress={() => handleDeleteMenuItem(hotel._id, item._id)}
                    >
                      <Text style={styles.deleteButtonTextSmall}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </>
        )}

        {activeTab === "users" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>All Users</Text>
            {users.map((user) => (
              <View key={user._id} style={styles.userItem}>
                <View>
                  <Text style={styles.userName}>{user.firstName} {user.secondName}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>
                <View style={styles.roleBadge}>
                  <Text style={styles.roleText}>{user.role}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === "common" && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Create Common Item</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Item Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter item name"
                  placeholderTextColor="#9CA3AF"
                  value={commonForm.name}
                  onChangeText={(text) => setCommonForm({ ...commonForm, name: text })}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Category</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter category"
                  placeholderTextColor="#9CA3AF"
                  value={commonForm.category}
                  onChangeText={(text) => setCommonForm({ ...commonForm, category: text })}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Food Type</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={commonForm.foodType}
                    onValueChange={(value) => setCommonForm({ ...commonForm, foodType: value })}
                    style={styles.picker}
                  >
                    <Picker.Item label="Veg" value="veg" />
                    <Picker.Item label="Non-Veg" value="nonveg" />
                  </Picker>
                </View>
              </View>
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Thali Eligible</Text>
                <Switch
                  value={commonForm.thaliEligible}
                  onValueChange={(value) => setCommonForm({ ...commonForm, thaliEligible: value })}
                  trackColor={{ false: "#D1D5DB", true: "#FCA5A5" }}
                  thumbColor={commonForm.thaliEligible ? "#EF4444" : "#F3F4F6"}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Photo</Text>
                {commonForm.photo && <Image source={{ uri: commonForm.photo.uri }} style={styles.preview} />}
                <TouchableOpacity style={styles.photoButton} onPress={selectPhotoForCommon}>
                  <Text style={styles.photoButtonText}>Choose Photo</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.submitButton} onPress={handleCreateCommonItem} disabled={submitting}>
                <Text style={styles.submitButtonText}>{submitting ? "Creating..." : "Create"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Common Items</Text>
              {commonMenuItems.map((item) => (
                <View key={item._id} style={styles.commonItem}>
                  {item.photo && <Image source={{ uri: item.photo }} style={styles.commonItemImage} />}
                  <View style={styles.commonItemInfo}>
                    <Text style={styles.commonItemName}>{item.name}</Text>
                    <Text style={styles.menuItemDetails}>{item.category} • {item.foodType}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButtonSmall}
                    onPress={() => handleDeleteCommonItem(item._id)}
                  >
                    <Text style={styles.deleteButtonTextSmall}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
              {commonMenuItems.length === 0 && (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No common items</Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    marginTop: 25,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 36,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
    letterSpacing: -0.25,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "400",
  },
  logoutButton: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#1E293B",
    fontSize: 16,
    marginTop: 12,
    fontWeight: "500",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: "#EF4444",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  hotelSection: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  hotelName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  hotelInfo: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
    marginTop: 12,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  menuItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
  },
  menuItemDetails: {
    fontSize: 13,
    color: "#64748B",
  },
  addPhotoButton: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addPhotoButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },
  deleteButtonSmall: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonTextSmall: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  userName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: "#64748B",
  },
  roleBadge: {
    backgroundColor: "#10B981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "500",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: "#1E293B",
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    overflow: "hidden",
  },
  picker: {
    height: 44,
    color: "#1E293B",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
  },
  preview: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 12,
  },
  photoButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  photoButtonText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  commonItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
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
    fontSize: 15,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  emptyText: {
    color: "#64748B",
    fontSize: 14,
  },
});