import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import Logo from "../components/Logo";
import { AuthContext } from "../context/AuthContext";

export default function HotelDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { hotelId } = route.params || {};
  const { logout } = useContext(AuthContext);

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("breakfast"); // breakfast or thali
  const [thaliMealType, setThaliMealType] = useState("lunch"); // lunch or dinner
  
  const [breakfastQuantities, setBreakfastQuantities] = useState({});
  const [thaliSelections, setThaliSelections] = useState({
    starter: [],
    rice: [],
    juices: [],
    others: [],
  });
  const [thaliPlates, setThaliPlates] = useState(1);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!hotelId) {
        Alert.alert("Error", "Invalid hotel ID");
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`/hotels/${hotelId}`);
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

  const incrementBreakfast = (itemId) => {
    setBreakfastQuantities((q) => ({ ...q, [itemId]: (q[itemId] || 0) + 1 }));
  };

  const decrementBreakfast = (itemId) => {
    setBreakfastQuantities((q) => ({ ...q, [itemId]: Math.max(0, (q[itemId] || 0) - 1) }));
  };

  const toggleThaliItem = (category, itemId) => {
    setThaliSelections((prev) => {
      const currentItems = prev[category];
      if (currentItems.includes(itemId)) {
        return { ...prev, [category]: currentItems.filter((id) => id !== itemId) };
      } else {
        return { ...prev, [category]: [...currentItems, itemId] };
      }
    });
  };

  const isItemSelected = (category, itemId) => {
    return thaliSelections[category]?.includes(itemId) || false;
  };

  const computeBreakfastTotal = () => {
    let total = 0;
    if (hotel?.menu) {
      hotel.menu
        .filter((item) => item.mealType === "breakfast")
        .forEach((item) => {
          const qty = breakfastQuantities[item._id] || 0;
          total += item.price * qty;
        });
    }
    return total;
  };

  const computeThaliTotal = () => {
    let totalPrice = 0;
    
    // Calculate price based on selected items
    Object.keys(thaliSelections).forEach((category) => {
      thaliSelections[category].forEach((itemId) => {
        const item = hotel?.menu?.find((m) => m._id === itemId);
        if (item) {
          totalPrice += item.price;
        }
      });
    });
    
    // Multiply by number of plates
    return totalPrice * thaliPlates;
  };

  const handleCheckout = () => {
    const breakfastItems = Object.keys(breakfastQuantities)
      .filter((id) => breakfastQuantities[id] > 0)
      .map((id) => {
        const item = hotel.menu.find((m) => m._id === id);
        return {
          name: item.name,
          quantity: breakfastQuantities[id],
          price: item.price,
        };
      });

    const thaliItems = [];
    if (thaliPlates > 0 && Object.values(thaliSelections).some((arr) => arr.length > 0)) {
      const selectedItems = {
        starter: thaliSelections.starter.map((id) => hotel.menu.find((m) => m._id === id)?.name).filter(Boolean),
        rice: thaliSelections.rice.map((id) => hotel.menu.find((m) => m._id === id)?.name).filter(Boolean),
        juices: thaliSelections.juices.map((id) => hotel.menu.find((m) => m._id === id)?.name).filter(Boolean),
        others: thaliSelections.others.map((id) => hotel.menu.find((m) => m._id === id)?.name).filter(Boolean),
      };
      thaliItems.push({
        name: `Custom ${thaliMealType.charAt(0).toUpperCase() + thaliMealType.slice(1)} Thali`,
        quantity: thaliPlates,
        price: computeThaliTotal() / thaliPlates, // Price per plate
        thaliOptions: selectedItems,
      });
    }

    const allItems = [...breakfastItems, ...thaliItems];
    if (allItems.length === 0) {
      Alert.alert("Error", "Please select at least one item");
      return;
    }

    const total = computeBreakfastTotal() + computeThaliTotal();
    navigation.navigate("OrderConfirmation", { hotelId, items: allItems, total });
  };

  const getBreakfastItems = () => 
    hotel?.menu?.filter((item) => item.mealType === "breakfast") || [];
  
  const getThaliItemsByCategory = (category) => {
    const items = hotel?.menu?.filter((item) => {
      const itemCategory = (item.category || "").toLowerCase().trim();
      const searchCategory = category.toLowerCase().trim();
      
      // Normalize category names for matching
      const normalize = (cat) => {
        const c = cat.replace(/\s+/g, "").toLowerCase();
        if (["starter", "starters","Startersss"].includes(c)) return "starter";
        if (["rice", "riceitem", "riceitems"].includes(c)) return "rice";
        if (["juice", "juices", "juicess", "juiceitem", "juiceitems","Juices"].includes(c)) return "juices";
        if (["other", "others", "otheritems", "otheritem", "otherr", "otherrs"].includes(c)) return "others";
        return c;
      };
      const normItemCat = normalize(itemCategory);
      const normSearchCat = normalize(searchCategory);
      // Debug logging
      console.log(`Comparing: item "${item.name}" category "${normItemCat}" with search "${normSearchCat}"`);
      console.log(`  - mealType: ${item.mealType}, thaliEligible: ${item.thaliEligible}`);
      // Check if item matches the current meal type (lunch/dinner) and is thali eligible
      const mealTypeMatch = item.mealType === thaliMealType;
      const isThaliEligible = item.thaliEligible === true;
      // Robust category matching
      const categoryMatch = normItemCat === normSearchCat;
      const shouldInclude = mealTypeMatch && isThaliEligible && categoryMatch;
      if (shouldInclude) {
        console.log(`  ✓ Including item: ${item.name}`);
      }
      return shouldInclude;
    }) || [];
    
    console.log(`Total items found for "${category}": ${items.length}`);
    return items;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Logo size={48} />
            </View>
            <View style={styles.centerContent}>
              <Text style={styles.title}>Loading...</Text>
              <Text style={styles.subtitle}>Fetching hotel details</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#EF4444" />
            <Text style={styles.loadingText}>Loading hotel details...</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (!hotel) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>🍽️</Text>
            </View>
            <View style={styles.centerContent}>
              <Text style={styles.title}>Not Found</Text>
              <Text style={styles.subtitle}>Hotel not found</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <Text style={styles.errorText}>Hotel not found</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  const breakfastItems = getBreakfastItems();
  const starterItems = getThaliItemsByCategory("starter");
  const riceItems = getThaliItemsByCategory("rice");
  const juiceItems = getThaliItemsByCategory("juices");
  const otherItems = getThaliItemsByCategory("others");

  const breakfastTotal = computeBreakfastTotal();
  const thaliTotal = computeThaliTotal();
  const grandTotal = breakfastTotal + thaliTotal;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🍽️</Text>
          </View>
          <View style={styles.centerContent}>
            <Text style={styles.title}>{hotel.name}</Text>
            <Text style={styles.subtitle}>{hotel.place}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Hotel Banner */}
        <View style={styles.bannerCard}>
          {hotel.photo ? (
            <Image source={{ uri: hotel.photo }} style={styles.bannerImage} />
          ) : (
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          )}
        </View>

        {/* Toggle Buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === "breakfast" && styles.toggleButtonActive]}
            onPress={() => setViewMode("breakfast")}
          >
            <Text style={[styles.toggleButtonText, viewMode === "breakfast" && styles.toggleButtonTextActive]}>
              Breakfast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === "thali" && styles.toggleButtonActive]}
            onPress={() => setViewMode("thali")}
          >
            <Text style={[styles.toggleButtonText, viewMode === "thali" && styles.toggleButtonTextActive]}>
              Lunch / Dinner
            </Text>
          </TouchableOpacity>
        </View>

        {/* BREAKFAST VIEW */}
        {viewMode === "breakfast" && (
          <View style={styles.contentSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Breakfast Menu</Text>
              <Text style={styles.sectionSubtitle}>Available from 7 AM - 11 AM</Text>
            </View>

            {breakfastItems.length > 0 ? (
              breakfastItems.map((item) => (
                <View key={item._id} style={styles.itemCard}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemTitleRow}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <View style={item.foodType === "veg" ? styles.vegDot : styles.nonVegDot} />
                    </View>
                    <Text style={styles.itemPrice}>₹{item.price}</Text>
                  </View>
                  <View style={styles.itemAction}>
                    {breakfastQuantities[item._id] > 0 ? (
                      <View style={styles.quantityControl}>
                        <TouchableOpacity
                          style={styles.quantityBtn}
                          onPress={() => decrementBreakfast(item._id)}
                        >
                          <Text style={styles.quantityBtnText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityValue}>{breakfastQuantities[item._id]}</Text>
                        <TouchableOpacity
                          style={styles.quantityBtn}
                          onPress={() => incrementBreakfast(item._id)}
                        >
                          <Text style={styles.quantityBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => incrementBreakfast(item._id)}
                      >
                        <Text style={styles.addBtnText}>ADD</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No breakfast items available</Text>
              </View>
            )}
          </View>
        )}

        {/* THALI VIEW */}
        {viewMode === "thali" && (
          <View style={styles.contentSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Build Your Thali</Text>
              
              {/* Lunch/Dinner Toggle */}
              <View style={styles.mealTypeTabs}>
                <TouchableOpacity
                  style={[styles.mealTab, thaliMealType === "lunch" && styles.mealTabActive]}
                  onPress={() => setThaliMealType("lunch")}
                >
                  <Text style={[styles.mealTabText, thaliMealType === "lunch" && styles.mealTabTextActive]}>
                    Lunch
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.mealTab, thaliMealType === "dinner" && styles.mealTabActive]}
                  onPress={() => setThaliMealType("dinner")}
                >
                  <Text style={[styles.mealTabText, thaliMealType === "dinner" && styles.mealTabTextActive]}>
                    Dinner
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Starters Section */}
            {starterItems.length > 0 && (
              <View style={styles.categorySection}>
                <Text style={styles.categoryTitle}>Starters Available</Text>
                {starterItems.map((item) => (
                  <View key={item._id} style={styles.thaliItemCard}>
                    <View style={styles.thaliItemInfo}>
                      <View style={styles.thaliItemTitleRow}>
                        <Text style={styles.thaliItemName}>{item.name}</Text>
                        <View style={item.foodType === "veg" ? styles.vegDotSmall : styles.nonVegDotSmall} />
                      </View>
                      <Text style={styles.thaliItemPrice}>₹{item.price}</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.selectCircle,
                        isItemSelected("starter", item._id) && styles.selectCircleActive,
                      ]}
                      onPress={() => toggleThaliItem("starter", item._id)}
                    >
                      <Text style={[
                        styles.selectCircleText,
                        isItemSelected("starter", item._id) && styles.selectCircleTextActive,
                      ]}>
                        {isItemSelected("starter", item._id) ? "✓" : "+"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Rice Section */}
            {riceItems.length > 0 && (
              <View style={styles.categorySection}>
                <Text style={styles.categoryTitle}>Rice Items Available</Text>
                {riceItems.map((item) => (
                  <View key={item._id} style={styles.thaliItemCard}>
                    <View style={styles.thaliItemInfo}>
                      <View style={styles.thaliItemTitleRow}>
                        <Text style={styles.thaliItemName}>{item.name}</Text>
                        <View style={item.foodType === "veg" ? styles.vegDotSmall : styles.nonVegDotSmall} />
                      </View>
                      <Text style={styles.thaliItemPrice}>₹{item.price}</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.selectCircle,
                        isItemSelected("rice", item._id) && styles.selectCircleActive,
                      ]}
                      onPress={() => toggleThaliItem("rice", item._id)}
                    >
                      <Text style={[
                        styles.selectCircleText,
                        isItemSelected("rice", item._id) && styles.selectCircleTextActive,
                      ]}>
                        {isItemSelected("rice", item._id) ? "✓" : "+"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Juices Section */}
            {juiceItems.length > 0 && (
              <View style={styles.categorySection}>
                <Text style={styles.categoryTitle}>Juices Available</Text>
                {juiceItems.map((item) => (
                  <View key={item._id} style={styles.thaliItemCard}>
                    <View style={styles.thaliItemInfo}>
                      <View style={styles.thaliItemTitleRow}>
                        <Text style={styles.thaliItemName}>{item.name}</Text>
                        <View style={item.foodType === "veg" ? styles.vegDotSmall : styles.nonVegDotSmall} />
                      </View>
                      <Text style={styles.thaliItemPrice}>₹{item.price}</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.selectCircle,
                        isItemSelected("juices", item._id) && styles.selectCircleActive,
                      ]}
                      onPress={() => toggleThaliItem("juices", item._id)}
                    >
                      <Text style={[
                        styles.selectCircleText,
                        isItemSelected("juices", item._id) && styles.selectCircleTextActive,
                      ]}>
                        {isItemSelected("juices", item._id) ? "✓" : "+"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Others Section */}
            {otherItems.length > 0 && (
              <View style={styles.categorySection}>
                <Text style={styles.categoryTitle}>Others Available</Text>
                {otherItems.map((item) => (
                  <View key={item._id} style={styles.thaliItemCard}>
                    <View style={styles.thaliItemInfo}>
                      <View style={styles.thaliItemTitleRow}>
                        <Text style={styles.thaliItemName}>{item.name}</Text>
                        <View style={item.foodType === "veg" ? styles.vegDotSmall : styles.nonVegDotSmall} />
                      </View>
                      <Text style={styles.thaliItemPrice}>₹{item.price}</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.selectCircle,
                        isItemSelected("others", item._id) && styles.selectCircleActive,
                      ]}
                      onPress={() => toggleThaliItem("others", item._id)}
                    >
                      <Text style={[
                        styles.selectCircleText,
                        isItemSelected("others", item._id) && styles.selectCircleTextActive,
                      ]}>
                        {isItemSelected("others", item._id) ? "✓" : "+"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Plates Counter - Now at the bottom */}
            <View style={styles.platesSection}>
              <Text style={styles.platesSectionTitle}>How Many Plates Do You Need?</Text>
              
              {/* Show selected items summary */}
              {Object.values(thaliSelections).some(arr => arr.length > 0) && (
                <View style={styles.selectionSummary}>
                  <Text style={styles.summaryTitle}>Selected Items:</Text>
                  {thaliSelections.starter.length > 0 && (
                    <Text style={styles.summaryText}>
                      Starters: {thaliSelections.starter.length} items
                    </Text>
                  )}
                  {thaliSelections.rice.length > 0 && (
                    <Text style={styles.summaryText}>
                      Rice: {thaliSelections.rice.length} items
                    </Text>
                  )}
                  {thaliSelections.juices.length > 0 && (
                    <Text style={styles.summaryText}>
                      Juices: {thaliSelections.juices.length} items
                    </Text>
                  )}
                  {thaliSelections.others.length > 0 && (
                    <Text style={styles.summaryText}>
                      Others: {thaliSelections.others.length} items
                    </Text>
                  )}
                </View>
              )}
              
              <View style={styles.platesCounter}>
                <TouchableOpacity
                  style={styles.platesBtn}
                  onPress={() => setThaliPlates(Math.max(0, thaliPlates - 1))}
                >
                  <Text style={styles.platesBtnText}>-</Text>
                </TouchableOpacity>
                <View style={styles.platesDisplay}>
                  <Text style={styles.platesNumber}>{thaliPlates}</Text>
                  <Text style={styles.platesLabel}>Plates</Text>
                </View>
                <TouchableOpacity
                  style={styles.platesBtn}
                  onPress={() => setThaliPlates(thaliPlates + 1)}
                >
                  <Text style={styles.platesBtnText}>+</Text>
                </TouchableOpacity>
              </View>
              
              {Object.values(thaliSelections).some(arr => arr.length > 0) ? (
                <View style={styles.priceBreakdown}>
                  <Text style={styles.pricePerPlate}>
                    ₹{computeThaliTotal() / thaliPlates} per plate
                  </Text>
                  <Text style={styles.platesTotal}>
                    Total: ₹{thaliTotal}
                  </Text>
                </View>
              ) : (
                <Text style={styles.selectItemsHint}>
                  Please select items to see the price
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Checkout Bar */}
        {grandTotal > 0 && (
          <View style={styles.checkoutBar}>
            <View style={styles.checkoutLeft}>
              <Text style={styles.checkoutLabel}>Total Amount</Text>
              <Text style={styles.checkoutTotal}>₹{grandTotal}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutBtnText}>Proceed</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 100,
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
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    fontWeight: "500",
  },
  bannerCard: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bannerPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerPlaceholderText: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "500",
  },
  toggleContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  toggleButtonActive: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748B",
  },
  toggleButtonTextActive: {
    color: "#FFFFFF",
  },
  contentSection: {
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
  sectionHeader: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EF4444",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  mealTypeTabs: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  mealTab: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  mealTabActive: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },
  mealTabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  mealTabTextActive: {
    color: "#FFFFFF",
  },
  itemCard: {
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  itemHeader: {
    marginBottom: 10,
  },
  itemTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
  itemAction: {
    alignItems: "center",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
    padding: 4,
  },
  quantityBtn: {
    width: 32,
    height: 32,
    backgroundColor: "#EF4444",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityBtnText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginHorizontal: 12,
    minWidth: 24,
    textAlign: "center",
  },
  addBtn: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  categorySection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  thaliItemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  thaliItemInfo: {
    flex: 1,
  },
  thaliItemTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  thaliItemName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1E293B",
    flex: 1,
  },
  thaliItemPrice: {
    fontSize: 14,
    color: "#64748B",
  },
  selectCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EF4444",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  selectCircleActive: {
    backgroundColor: "#EF4444",
  },
  selectCircleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
  selectCircleTextActive: {
    color: "#FFFFFF",
  },
  platesSection: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#EF4444",
    alignItems: "center",
  },
  platesSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 20,
    textAlign: "center",
  },
  platesCounter: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  platesBtn: {
    width: 44,
    height: 44,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  platesBtnText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  platesDisplay: {
    marginHorizontal: 24,
    alignItems: "center",
  },
  platesNumber: {
    fontSize: 32,
    fontWeight: "700",
    color: "#EF4444",
    marginBottom: 4,
  },
  platesLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  platesTotal: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
  },
  selectionSummary: {
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 12,
    color: "#3B82F6",
    marginBottom: 2,
  },
  priceBreakdown: {
    alignItems: "center",
  },
  pricePerPlate: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  selectItemsHint: {
    fontSize: 14,
    color: "#9CA3AF",
    fontStyle: "italic",
    textAlign: "center",
  },
  vegDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10B981",
    borderWidth: 1,
    borderColor: "#059669",
  },
  nonVegDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#EF4444",
    borderWidth: 1,
    borderColor: "#DC2626",
  },
  vegDotSmall: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#10B981",
    marginLeft: 6,
  },
  nonVegDotSmall: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EF4444",
    marginLeft: 6,
  },
  emptyState: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  checkoutBar: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  checkoutLeft: {
    flex: 1,
  },
  checkoutLabel: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 2,
  },
  checkoutTotal: {
    fontSize: 20,
    fontWeight: "600",
    color: "#EF4444",
  },
  checkoutBtn: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 12,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  checkoutBtnText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});