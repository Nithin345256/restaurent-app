import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";

export default function UserHome({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [commonMenuItems, setCommonMenuItems] = useState([]);
  const [selectedCommonItem, setSelectedCommonItem] = useState(null);

  useEffect(() => {
    fetchCommonMenuItems();
    fetchHotels();
  }, [filter, searchQuery]);

  useEffect(() => {
    if (selectedCommonItem) {
      fetchHotelsByCommonItem(selectedCommonItem._id);
    } else {
      fetchHotels();
    }
  }, [selectedCommonItem]);

  const fetchCommonMenuItems = async () => {
    try {
      const res = await api.get("/common-menu");
      let items = Array.isArray(res.data) ? res.data : res.data.commonMenuItems || [];
      // Fix photo URLs to be absolute
      items = items.map(item => ({
        ...item,
        photo: item.photo && item.photo.startsWith("/uploads/")
          ? `${api.defaults.baseURL.replace('/api','')}${item.photo}`
          : item.photo
      }));
      console.log("Fetched common menu items:", items);
      setCommonMenuItems(items);
    } catch (error) {
      console.log("Error fetching common menu items:", error);
      setCommonMenuItems([]);
    }
  };

  const fetchHotelsByCommonItem = async (commonItemId) => {
    setLoading(true);
    try {
      const res = await api.get(`/hotels/by-common-item/${commonItemId}`);
      let fetchedHotels = Array.isArray(res.data) ? res.data : res.data.hotels || [];
      if (searchQuery) {
        fetchedHotels = fetchedHotels.filter((hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setHotels(fetchedHotels);
    } catch (error) {
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchHotels = async () => {
    setLoading(true);
    try {
      let url = "/hotels";
      if (filter !== "all") {
        url = `/hotels/type?type=${filter}`;
      }
      const response = await api.get(url);
      // Support both array and object response formats
      let fetchedHotels = Array.isArray(response.data)
        ? response.data
        : response.data.hotels || [];
      if (searchQuery) {
        fetchedHotels = fetchedHotels.filter((hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setHotels(fetchedHotels);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to fetch hotels");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (type) => {
    setFilter(type);
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

  const renderHotel = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("HotelDetails", { hotelId: item._id })}
      activeOpacity={0.8}
    >
      {item.photo ? (
        <Image source={{ uri: item.photo }} style={styles.hotelImage} />
      ) : (
        <View style={styles.placeholderPhoto}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <Text style={styles.hotelAddress} numberOfLines={2}>
          📍 {item.address}
        </Text>
        {item.options?.length > 0 && (
          <View style={styles.optionsContainer}>
            {item.options.includes("veg") && (
              <View style={styles.vegBadge}>
                <Text style={styles.vegText}>🟢 Veg</Text>
              </View>
            )}
            {item.options.includes("nonveg") && (
              <View style={styles.nonVegBadge}>
                <Text style={styles.nonVegText}>🔴 Non-Veg</Text>
              </View>
            )}
          </View>
        )}
        <TouchableOpacity style={styles.viewMenuButton}>
          <Text style={styles.viewMenuText}>View Menu →</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Grid rendering for hotels (2 per row)
  const renderHotelGrid = () => {
    const rows = [];
    for (let i = 0; i < hotels.length; i += 2) {
      rows.push(
        <View style={styles.hotelRow} key={i}>
          <View style={{ flex: 1, marginRight: 8 }}>{renderHotel({ item: hotels[i] })}</View>
          {hotels[i + 1] && <View style={{ flex: 1, marginLeft: 8 }}>{renderHotel({ item: hotels[i + 1] })}</View>}
        </View>
      );
    }
    return rows;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>🍽️</Text>
            </View>
            <View style={styles.centerContent}>
              <Text style={styles.title}>Restaurants</Text>
              <Text style={styles.subtitle}>Discover great places to eat</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#EF4444" />
            <Text style={styles.loadingText}>Loading restaurants...</Text>
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
            <Text style={styles.title}>Restaurants</Text>
            <Text style={styles.subtitle}>Discover great places to eat</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="🔍 Search restaurants..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Common Menu Items Horizontal Scroll */}
        <View style={styles.commonMenuSection}>
          <Text style={styles.sectionTitle}>Popular Foods</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.commonMenuScroll}>
            {commonMenuItems.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={[
                  styles.commonMenuItem,
                  selectedCommonItem?._id === item._id && styles.commonMenuItemActive
                ]}
                onPress={() => setSelectedCommonItem(selectedCommonItem?._id === item._id ? null : item)}
                activeOpacity={0.8}
              >
                {item.photo && (
                  <Image source={{ uri: item.photo }} style={styles.commonMenuImage} />
                )}
                <Text style={styles.commonMenuName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.commonMenuCategory} numberOfLines={1}>{item.category}</Text>
                <Text style={styles.commonMenuType}>{item.foodType === "veg" ? "🟢 Veg" : "🔴 Non-Veg"}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filter Buttons - Hide when a common menu item is selected */}
        {!selectedCommonItem && (
          <View style={styles.filterButtonsSection}>
            <View style={styles.filterButtons}>
              <TouchableOpacity
                style={[styles.filterButton, filter === "all" && styles.filterButtonActive]}
                onPress={() => handleFilterChange("all")}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterButtonText, filter === "all" && styles.filterButtonTextActive]}>
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, filter === "veg" && styles.filterButtonActive]}
                onPress={() => handleFilterChange("veg")}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterButtonText, filter === "veg" && styles.filterButtonTextActive]}>
                  🟢 Veg
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, filter === "nonveg" && styles.filterButtonActive]}
                onPress={() => handleFilterChange("nonveg")}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterButtonText, filter === "nonveg" && styles.filterButtonTextActive]}>
                  🔴 Non-Veg
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Hotels Grid */}
        <View style={styles.listContent}>
          {hotels.length > 0 ? (
            renderHotelGrid()
          ) : selectedCommonItem ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hotels found for this food</Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No restaurants found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
            </View>
          )}
        </View>
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
  searchSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchContainer: {
    marginBottom: 0,
  },
  searchInput: {
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: "#1E293B",
  },
  commonMenuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  commonMenuScroll: {
    paddingBottom: 8,
  },
  commonMenuItem: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    width: 100,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  commonMenuItemActive: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  commonMenuImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
  },
  commonMenuName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 2,
  },
  commonMenuCategory: {
    fontSize: 10,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 2,
  },
  commonMenuType: {
    fontSize: 10,
    color: "#EF4444",
    fontWeight: "500",
    textAlign: "center",
  },
  filterButtonsSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterButtons: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  filterButtonActive: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  hotelImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  placeholderPhoto: {
    width: "100%",
    height: 160,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
  },
  cardContent: {
    padding: 12,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  hotelAddress: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
    lineHeight: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  vegBadge: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#10B981",
  },
  vegText: {
    color: "#047857",
    fontSize: 11,
    fontWeight: "500",
  },
  nonVegBadge: {
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EF4444",
  },
  nonVegText: {
    color: "#EF4444",
    fontSize: 11,
    fontWeight: "500",
  },
  viewMenuButton: {
    backgroundColor: "#EF4444",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  viewMenuText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#64748B",
  },
  hotelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});