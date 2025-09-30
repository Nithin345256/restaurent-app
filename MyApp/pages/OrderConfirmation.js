import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  ImageBackground,
  Switch,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function OrderConfirmation() {
  const route = useRoute();
  const navigation = useNavigation();
  const { hotelId, items, total: subtotal } = route.params;

  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [distance, setDistance] = useState(0);
  const [wantsCatering, setWantsCatering] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);

  // Sagar, Karnataka coordinates
  const SAGAR_LAT = 14.1644;
  const SAGAR_LNG = 75.0390;

  // Calculate distance in km using Haversine formula
  const calculateDistance = () => {
    if (!latitude || !longitude) {
      Alert.alert("Error", "Please enter valid latitude and longitude");
      return;
    }

    const lat1 = parseFloat(latitude);
    const lng1 = parseFloat(longitude);

    if (isNaN(lat1) || isNaN(lng1)) {
      Alert.alert("Error", "Invalid coordinates");
      return;
    }

    const R = 6371; // Radius of Earth in km
    const dLat = ((lat1 - SAGAR_LAT) * Math.PI) / 180;
    const dLng = ((lng1 - SAGAR_LNG) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((SAGAR_LAT * Math.PI) / 180) *
        Math.cos((lat1 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;

    setDistance(parseFloat(dist.toFixed(2)));
    setIsCalculated(true);
  };

  const deliveryCharge = distance * 20;
  const cateringCharge = wantsCatering ? 1500 : 0;
  const estimatedTime = Math.ceil(distance * 10); // 10 min per km
  const finalTotal = subtotal + deliveryCharge + cateringCharge;

  const handleConfirmOrder = async () => {
    if (!deliveryLocation.trim()) {
      Alert.alert("Error", "Please enter delivery location");
      return;
    }

    if (!isCalculated) {
      Alert.alert("Error", "Please calculate delivery charges first");
      return;
    }

    try {
      await api.post("/orders", {
        hotelId,
        items,
        total: finalTotal,
        deliveryLocation,
        distance,
        deliveryCharge,
        cateringCharge,
        estimatedTime,
        coordinates: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
      });
      Alert.alert("Success", "Order placed successfully!", [
        { text: "OK", onPress: () => navigation.navigate("UserHome") },
      ]);
    } catch (e) {
      Alert.alert("Error", e.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Order Confirmation" />
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
        }}
        style={styles.background}
        blurRadius={3}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Order Summary Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Order Summary</Text>
            <View style={styles.divider} />
            {items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                </View>
                <Text style={styles.itemPrice}>₹{item.quantity * item.price}</Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text style={styles.subtotalPrice}>₹{subtotal}</Text>
            </View>
          </View>

          {/* Delivery Details Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Delivery Details</Text>
            <View style={styles.divider} />
            
            <Text style={styles.label}>Delivery Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your delivery address"
              placeholderTextColor="#9CA3AF"
              value={deliveryLocation}
              onChangeText={setDeliveryLocation}
              multiline
            />

            <Text style={styles.label}>Your Location (Coordinates)</Text>
            <View style={styles.coordinateRow}>
              <TextInput
                style={[styles.input, styles.coordinateInput]}
                placeholder="Latitude"
                placeholderTextColor="#9CA3AF"
                value={latitude}
                onChangeText={setLatitude}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.coordinateInput]}
                placeholder="Longitude"
                placeholderTextColor="#9CA3AF"
                value={longitude}
                onChangeText={setLongitude}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity style={styles.calculateButton} onPress={calculateDistance}>
              <Text style={styles.calculateButtonText}>Calculate Delivery Charges</Text>
            </TouchableOpacity>

            {isCalculated && (
              <View style={styles.deliveryInfo}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Distance from Sagar</Text>
                  <Text style={styles.infoValue}>{distance} km</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Delivery Charge (₹20/km)</Text>
                  <Text style={styles.infoValue}>₹{deliveryCharge}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Estimated Time</Text>
                  <Text style={styles.infoValue}>{estimatedTime} min</Text>
                </View>
              </View>
            )}
          </View>

          {/* Catering Service Card */}
          <View style={styles.card}>
            <View style={styles.cateringHeader}>
              <View>
                <Text style={styles.cardTitle}>Catering Service</Text>
                <Text style={styles.cateringSubtext}>Professional service for your event</Text>
              </View>
              <Switch
                value={wantsCatering}
                onValueChange={setWantsCatering}
                trackColor={{ false: "#D1D5DB", true: "#FCA5A5" }}
                thumbColor={wantsCatering ? "#E23744" : "#F3F4F6"}
              />
            </View>
            {wantsCatering && (
              <View style={styles.cateringInfo}>
                <Text style={styles.cateringPrice}>+ ₹1,500</Text>
                <Text style={styles.cateringDetails}>
                  Includes serving staff, utensils, and table setup
                </Text>
              </View>
            )}
          </View>

          {/* Final Total Card */}
          {isCalculated && (
            <View style={[styles.card, styles.totalCard]}>
              <View style={styles.finalTotalRow}>
                <Text style={styles.finalTotalLabel}>Total Amount</Text>
                <Text style={styles.finalTotalPrice}>₹{finalTotal}</Text>
              </View>
              <View style={styles.breakdownContainer}>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownText}>Food Items</Text>
                  <Text style={styles.breakdownText}>₹{subtotal}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownText}>Delivery</Text>
                  <Text style={styles.breakdownText}>₹{deliveryCharge}</Text>
                </View>
                {wantsCatering && (
                  <View style={styles.breakdownRow}>
                    <Text style={styles.breakdownText}>Catering</Text>
                    <Text style={styles.breakdownText}>₹{cateringCharge}</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Confirm Button */}
          <TouchableOpacity
            style={[styles.confirmButton, !isCalculated && styles.confirmButtonDisabled]}
            onPress={handleConfirmOrder}
            disabled={!isCalculated}
          >
            <Text style={styles.confirmButtonText}>
              {isCalculated ? "Confirm Order" : "Calculate Charges First"}
            </Text>
          </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#E23744",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },
  subtotalPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginTop: 8,
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
  coordinateRow: {
    flexDirection: "row",
    gap: 12,
  },
  coordinateInput: {
    flex: 1,
  },
  calculateButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E23744",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  calculateButtonText: {
    color: "#E23744",
    fontSize: 16,
    fontWeight: "700",
  },
  deliveryInfo: {
    backgroundColor: "#FEF2F2",
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 16,
    color: "#E23744",
    fontWeight: "700",
  },
  cateringHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cateringSubtext: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  cateringInfo: {
    backgroundColor: "#FEF2F2",
    borderRadius: 10,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  cateringPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#E23744",
    marginBottom: 4,
  },
  cateringDetails: {
    fontSize: 14,
    color: "#6B7280",
  },
  totalCard: {
    backgroundColor: "rgba(226, 55, 68, 0.05)",
    borderWidth: 2,
    borderColor: "#E23744",
  },
  finalTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  finalTotalLabel: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  finalTotalPrice: {
    fontSize: 28,
    fontWeight: "800",
    color: "#E23744",
  },
  breakdownContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#FEE2E2",
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  breakdownText: {
    fontSize: 14,
    color: "#6B7280",
  },
  confirmButton: {
    backgroundColor: "#E23744",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    shadowColor: "#E23744",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginTop: 8,
    marginBottom: 8,
  },
  confirmButtonDisabled: {
    backgroundColor: "#9CA3AF",
    shadowOpacity: 0,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});