import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  Switch,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { api } from "../services/api";

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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🍽️</Text>
          </View>
          <Text style={styles.title}>Order Confirmation</Text>
          <Text style={styles.subtitle}>Review your order</Text>
        </View>

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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Delivery Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your delivery address"
              placeholderTextColor="#9CA3AF"
              value={deliveryLocation}
              onChangeText={setDeliveryLocation}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
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
              thumbColor={wantsCatering ? "#EF4444" : "#F3F4F6"}
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
          style={[
            styles.confirmButton,
            (!isCalculated || !deliveryLocation.trim()) && styles.confirmButtonDisabled
          ]}
          onPress={handleConfirmOrder}
          disabled={!isCalculated || !deliveryLocation.trim()}
        >
          <Text style={styles.confirmButtonText}>
            {isCalculated ? "Confirm Order" : "Calculate Charges First"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 36,
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
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 12,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#F1F5F9",
    padding: 12,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#475569",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  subtotalText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#475569",
  },
  subtotalPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
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
  coordinateRow: {
    flexDirection: "row",
    gap: 12,
  },
  coordinateInput: {
    flex: 1,
  },
  calculateButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  calculateButtonText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "500",
  },
  deliveryInfo: {
    backgroundColor: "#FEF2F2",
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 15,
    color: "#EF4444",
    fontWeight: "600",
  },
  cateringHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cateringSubtext: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  cateringInfo: {
    backgroundColor: "#FEF2F2",
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  cateringPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: "#EF4444",
    marginBottom: 4,
  },
  cateringDetails: {
    fontSize: 13,
    color: "#64748B",
  },
  totalCard: {
    backgroundColor: "#FEF2F2",
    borderColor: "#EF4444",
  },
  finalTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  finalTotalLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
  },
  finalTotalPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#EF4444",
  },
  breakdownContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#FECACA",
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  breakdownText: {
    fontSize: 14,
    color: "#64748B",
  },
  confirmButton: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 40,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  confirmButtonDisabled: {
    backgroundColor: "#F3F4F6",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});