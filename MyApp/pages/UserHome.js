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
  ImageBackground,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function UserHome({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchHotels();
  }, [filter, searchQuery]);

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
        <View style={styles.viewMenuButton}>
          <Text style={styles.viewMenuText}>View Menu →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Loading..." showLogout={true} onLogout={logout} />
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80",
          }}
          style={styles.background}
          blurRadius={5}
        >
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#E23744" />
            <Text style={styles.loadingText}>Loading restaurants...</Text>
          </View>
        </ImageBackground>
        <Footer />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Restaurants" showLogout={true} onLogout={logout} />
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80",
        }}
        style={styles.background}
        blurRadius={3}
      >
        {/* Filter Section */}
        <View style={styles.filterSection}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="🔍 Search restaurants..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.filterButtons}>
            <TouchableOpacity
              style={[styles.filterButton, filter === "all" && styles.filterButtonActive]}
              onPress={() => handleFilterChange("all")}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterButtonText, filter === "all" && styles.filterButtonTextActive]}>
                All Restaurants
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filter === "veg" && styles.filterButtonActive]}
              onPress={() => handleFilterChange("veg")}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterButtonText, filter === "veg" && styles.filterButtonTextActive]}>
                🟢 Pure Veg
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filter === "nonveg" && styles.filterButtonActive]}
              onPress={() => handleFilterChange("nonveg")}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterButtonText, filter === "nonveg" && styles.filterButtonTextActive]}>
                🔴 Non-Veg
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={hotels}
          keyExtractor={(item) => item._id}
          renderItem={renderHotel}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No restaurants found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 12,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  filterSection: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    padding: 14,
    borderRadius: 12,
    color: "#111827",
    fontSize: 16,
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
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: "#E23744",
    borderColor: "#E23744",
  },
  filterButtonText: {
    color: "#374151",
    fontWeight: "700",
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  hotelImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  placeholderPhoto: {
    width: "100%",
    height: 200,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "600",
  },
  cardContent: {
    padding: 16,
  },
  hotelName: {
    color: "#111827",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 6,
  },
  hotelAddress: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 8,
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
  viewMenuButton: {
    backgroundColor: "#E23744",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  viewMenuText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    marginTop: 20,
  },
  emptyText: {
    color: "#374151",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubtext: {
    color: "#9CA3AF",
    fontSize: 14,
  },
});