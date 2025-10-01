import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HotelDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { hotelId } = route.params || {};
  const { logout } = useContext(AuthContext);

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchHotel = async () => {
      if (!hotelId) {
        Alert.alert("Error", "Invalid hotel ID");
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`/hotels/${hotelId}`);
        // Support both object and {hotel: ...} response formats
        let fetchedHotel = res.data.hotel || res.data;
        setHotel(fetchedHotel || null);
      } catch (e) {
        console.error("Fetch hotel error:", e.response?.data || e.message);
        Alert.alert("Error", e.response?.data?.message || "Failed to fetch hotel details");
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [hotelId]);

  const increment = (index) => {
    setQuantities((q) => ({ ...q, [index]: (q[index] || 0) + 1 }));
  };

  const decrement = (index) => {
    setQuantities((q) => ({ ...q, [index]: Math.max(0, (q[index] || 0) - 1) }));
  };

  const computeTotal = () => {
    let total = 0;
    if (hotel?.menu) {
      hotel.menu.forEach((item, index) => {
        const qty = quantities[index] || 0;
        total += item.price * qty;
      });
    }
    return total;
  };

  const handleCheckout = async () => {
    if (!Object.values(quantities).some((qty) => qty > 0)) {
      Alert.alert("Error", "Please select at least one item");
      return;
    }
    
    const selectedItems = hotel.menu
      .map((item, index) => ({
        name: item.name,
        quantity: quantities[index] || 0,
        price: item.price,
      }))
      .filter((item) => item.quantity > 0);
    
    const total = computeTotal();
    navigation.navigate("OrderConfirmation", { hotelId, items: selectedItems, total });
  };

  const renderMenuItem = ({ item, index }) => (
    <View style={styles.menuCard}>
      {item.photo ? (
        <Image source={{ uri: item.photo }} style={styles.menuImage} />
      ) : (
        <View style={styles.menuImagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.menuInfo}>
        <View style={styles.menuHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          {item.foodType === "veg" ? (
            <View style={styles.vegIndicator}>
              <Text style={styles.vegDot}>🟢</Text>
            </View>
          ) : (
            <View style={styles.nonVegIndicator}>
              <Text style={styles.nonVegDot}>🔴</Text>
            </View>
          )}
        </View>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
        {item.thaliEligible && (
          <View style={styles.thaliTag}>
            <Text style={styles.thaliText}>🍛 Available in Thali</Text>
          </View>
        )}
      </View>
      <View style={styles.quantitySection}>
        {quantities[index] > 0 ? (
          <View style={styles.quantityControls}>
            <TouchableOpacity style={styles.quantityButton} onPress={() => decrement(index)}>
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantities[index]}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={() => increment(index)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={() => increment(index)}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Loading..." showLogout={true} onLogout={logout} />
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
          }}
          style={styles.background}
          blurRadius={5}
        >
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#E23744" />
            <Text style={styles.loadingText}>Loading menu...</Text>
          </View>
        </ImageBackground>
        <Footer />
      </View>
    );
  }

  if (!hotel) {
    return (
      <View style={styles.container}>
        <Header title="Hotel Not Found" showLogout={true} onLogout={logout} />
        <View style={styles.center}>
          <Text style={styles.errorText}>Hotel not found</Text>
        </View>
        <Footer />
      </View>
    );
  }

  const totalAmount = computeTotal();
  const itemCount = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  return (
    <View style={styles.container}>
      <Header title={hotel.name} showLogout={true} onLogout={logout} />
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
        }}
        style={styles.background}
        blurRadius={3}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Hotel Info Card */}
          <View style={styles.hotelInfoCard}>
            {hotel.photo && (
              <Image source={{ uri: hotel.photo }} style={styles.hotelBanner} />
            )}
            <View style={styles.hotelInfoContent}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <Text style={styles.hotelPlace}>📍 {hotel.place}</Text>
              <Text style={styles.hotelAddress}>{hotel.address}</Text>
              {hotel.options?.length > 0 && (
                <View style={styles.optionsRow}>
                  {hotel.options.includes("veg") && (
                    <View style={styles.vegBadge}>
                      <Text style={styles.vegText}>🟢 Pure Veg</Text>
                    </View>
                  )}
                  {hotel.options.includes("nonveg") && (
                    <View style={styles.nonVegBadge}>
                      <Text style={styles.nonVegText}>🔴 Non-Veg Available</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>

          {/* Menu Section */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Menu</Text>
            {hotel.menu?.length > 0 ? (
              <FlatList
                data={hotel.menu}
                keyExtractor={(_, idx) => `menu-${idx}`}
                renderItem={renderMenuItem}
                scrollEnabled={false}
              />
            ) : (
              <View style={styles.emptyMenu}>
                <Text style={styles.emptyMenuText}>No menu items available</Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Checkout Footer */}
        {itemCount > 0 && (
          <View style={styles.checkoutFooter}>
            <View style={styles.checkoutInfo}>
              <Text style={styles.itemCountText}>{itemCount} Item{itemCount > 1 ? 's' : ''}</Text>
              <Text style={styles.totalAmount}>₹{totalAmount}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout →</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingBottom: 100,
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
  errorText: {
    color: "#E23744",
    fontSize: 18,
    fontWeight: "600",
  },
  hotelInfoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  hotelBanner: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  hotelInfoContent: {
    padding: 16,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  hotelPlace: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 4,
  },
  hotelAddress: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: "row",
    gap: 8,
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
  menuSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  menuCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  menuImagePlaceholder: {
    width: "100%",
    height: 140,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "600",
  },
  menuInfo: {
    padding: 12,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },
  vegIndicator: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  vegDot: {
    fontSize: 16,
  },
  nonVegIndicator: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  nonVegDot: {
    fontSize: 16,
  },
  itemCategory: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E23744",
    marginBottom: 8,
  },
  thaliTag: {
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  thaliText: {
    fontSize: 12,
    color: "#E23744",
    fontWeight: "600",
  },
  quantitySection: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  addButton: {
    backgroundColor: "#E23744",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#E23744",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    minWidth: 40,
    textAlign: "center",
  },
  emptyMenu: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 40,
    alignItems: "center",
  },
  emptyMenuText: {
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "600",
  },
  checkoutFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 2,
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  checkoutInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  itemCountText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#E23744",
  },
  checkoutButton: {
    backgroundColor: "#E23744",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#E23744",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});