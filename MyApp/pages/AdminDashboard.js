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
  ImageBackground,
  Switch,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import { Picker } from "@react-native-picker/picker";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

      await api.post(`/admin/hotels/${hotelId}/menu/${menuId}/photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
      const formData = new FormData();
      formData.append("name", commonForm.name);
      formData.append("category", commonForm.category);
      formData.append("foodType", commonForm.foodType);
      formData.append("thaliEligible", commonForm.thaliEligible.toString());
      formData.append("photo", {
        uri: commonForm.photo.uri,
        type: "image/jpeg",
        name: "common-item.jpg",
      });

  await api.post("/admin/common-menu", formData);

      Alert.alert("Success", "Common menu item created!");
      setCommonForm({ name: "", category: "", foodType: "veg", thaliEligible: false, photo: null });
      fetchData();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to create item");
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

  if (!user?.id || user?.role !== "admin") {
    return null;
  }

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
      <Header title="Admin Dashboard" showLogout={true} onLogout={logout} />
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1920&q=80" }}
        style={styles.background}
        blurRadius={3}
      >
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

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
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
                <Text style={styles.emptyText}>No pending items</Text>
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
                <TextInput
                  style={styles.input}
                  placeholder="Item Name"
                  value={commonForm.name}
                  onChangeText={(text) => setCommonForm({ ...commonForm, name: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Category"
                  value={commonForm.category}
                  onChangeText={(text) => setCommonForm({ ...commonForm, category: text })}
                />
                <Picker
                  selectedValue={commonForm.foodType}
                  onValueChange={(value) => setCommonForm({ ...commonForm, foodType: value })}
                  style={styles.picker}
                >
                  <Picker.Item label="Veg" value="veg" />
                  <Picker.Item label="Non-Veg" value="nonveg" />
                </Picker>
                <View style={styles.switchRow}>
                  <Text>Thali Eligible</Text>
                  <Switch
                    value={commonForm.thaliEligible}
                    onValueChange={(value) => setCommonForm({ ...commonForm, thaliEligible: value })}
                  />
                </View>
                {commonForm.photo && <Image source={{ uri: commonForm.photo.uri }} style={styles.preview} />}
                <TouchableOpacity style={styles.photoButton} onPress={selectPhotoForCommon}>
                  <Text style={styles.photoButtonText}>Choose Photo</Text>
                </TouchableOpacity>
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
                      <Text>{item.category} • {item.foodType}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteButtonSmall}
                      onPress={() => handleDeleteCommonItem(item._id)}
                    >
                      <Text style={styles.deleteButtonTextSmall}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))}
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
  container: { flex: 1, backgroundColor: "#FFF" },
  background: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  tabContainer: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.95)" },
  tab: { flex: 1, paddingVertical: 14, alignItems: "center" },
  tabActive: { borderBottomWidth: 3, borderBottomColor: "#E23744" },
  tabText: { fontSize: 13, fontWeight: "600", color: "#6B7280" },
  tabTextActive: { color: "#E23744" },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 24 },
  card: { backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 16, padding: 20, marginBottom: 16 },
  cardTitle: { fontSize: 20, fontWeight: "700", color: "#111", marginBottom: 16 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  cardHeaderLeft: { flex: 1 },
  hotelSection: { marginBottom: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#E5E7EB" },
  hotelName: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  hotelInfo: { fontSize: 14, color: "#6B7280", marginBottom: 4 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginTop: 12, marginBottom: 12 },
  menuItem: { flexDirection: "row", backgroundColor: "#F9FAFB", borderRadius: 12, padding: 12, marginBottom: 12, alignItems: "center" },
  menuItemImage: { width: 70, height: 70, borderRadius: 8, marginRight: 12 },
  menuItemInfo: { flex: 1 },
  menuItemName: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  menuItemDetails: { fontSize: 14, color: "#6B7280" },
  addPhotoButton: { backgroundColor: "#E23744", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  addPhotoButtonText: { color: "#FFF", fontWeight: "700", fontSize: 14 },
  deleteButton: { backgroundColor: "#DC2626", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  deleteButtonText: { color: "#FFF", fontWeight: "700", fontSize: 14 },
  deleteButtonSmall: { backgroundColor: "#DC2626", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  deleteButtonTextSmall: { color: "#FFF", fontWeight: "700", fontSize: 12 },
  userItem: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#F9FAFB", borderRadius: 12, padding: 16, marginBottom: 12 },
  userName: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  userEmail: { fontSize: 14, color: "#6B7280" },
  roleBadge: { backgroundColor: "#E23744", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  roleText: { color: "#FFF", fontSize: 12, fontWeight: "700" },
  input: { borderWidth: 2, borderColor: "#E5E7EB", borderRadius: 10, padding: 12, marginBottom: 12 },
  picker: { height: 50, marginBottom: 12 },
  switchRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16, paddingVertical: 8 },
  preview: { width: "100%", height: 200, borderRadius: 12, marginBottom: 12 },
  photoButton: { borderWidth: 2, borderColor: "#E23744", borderRadius: 10, padding: 14, alignItems: "center", marginBottom: 16 },
  photoButtonText: { color: "#E23744", fontSize: 16, fontWeight: "700" },
  submitButton: { backgroundColor: "#E23744", borderRadius: 10, padding: 16, alignItems: "center" },
  submitButtonText: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  commonItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#F9FAFB", borderRadius: 12, padding: 12, marginBottom: 12 },
  commonItemImage: { width: 70, height: 70, borderRadius: 8, marginRight: 12 },
  commonItemInfo: { flex: 1 },
  commonItemName: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  emptyText: { textAlign: "center", color: "#9CA3AF", fontSize: 16, paddingVertical: 20 },
});