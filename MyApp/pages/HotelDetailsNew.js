import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity } from "react-native";

// Lightweight HotelDetails replacement to avoid the corrupted original file.
export default function HotelDetailsNew({ route, navigation }) {
  const hotel = route?.params?.hotel || { name: "Hotel", place: "Unknown", photo: null };
  const [viewMode, setViewMode] = useState("breakfast");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={hotel.photo ? { uri: hotel.photo } : { uri: 'https://via.placeholder.com/400x200/eee/999?text=No+Hotel+Image' }}
          style={styles.headerBackground}
          imageStyle={styles.headerBackgroundImage}
        >
          <View style={styles.headerOverlay} />
          <View style={styles.headerTextContent}>
            <Text style={styles.title}>{hotel.name}</Text>
            <Text style={styles.subtitle}>{hotel.place}</Text>
          </View>
        </ImageBackground>

        <View style={styles.bannerCard}>
          {hotel.photo ? (
            <Image source={{ uri: hotel.photo }} style={styles.bannerImage} />
          ) : (
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>No Image</Text>
            </View>
          )}
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === "breakfast" && styles.toggleButtonActive]}
            onPress={() => setViewMode("breakfast")}
          >
            <Text style={[styles.toggleButtonText, viewMode === "breakfast" && styles.toggleButtonTextActive]}>Breakfast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === "thali" && styles.toggleButtonActive]}
            onPress={() => setViewMode("thali")}
          >
            <Text style={[styles.toggleButtonText, viewMode === "thali" && styles.toggleButtonTextActive]}>Lunch / Dinner</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>{viewMode === "breakfast" ? "Breakfast Menu" : "Build Your Thali"}</Text>
          <Text style={styles.sectionSubtitle}>Menu items load here (simplified view)</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { padding: 16, paddingBottom: 120 },
  headerBackground: { width: "100%", height: 180, marginBottom: 12 },
  headerBackgroundImage: { resizeMode: "cover" },
  headerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.2)" },
  headerTextContent: { position: "absolute", bottom: 16, left: 16 },
  title: { fontSize: 20, color: "#fff", fontWeight: "600" },
  subtitle: { fontSize: 14, color: "#fff" },
  bannerCard: { height: 180, borderRadius: 12, overflow: "hidden", marginBottom: 12, backgroundColor: "#fff" },
  bannerImage: { width: "100%", height: "100%", resizeMode: "cover" },
  bannerPlaceholder: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F1F5F9" },
  bannerPlaceholderText: { color: "#9CA3AF", fontSize: 16 },
  toggleContainer: { flexDirection: "row", gap: 12, marginBottom: 16 },
  toggleButton: { flex: 1, backgroundColor: "#F1F5F9", padding: 12, borderRadius: 8, alignItems: "center" },
  toggleButtonActive: { backgroundColor: "#EF4444" },
  toggleButtonText: { color: "#64748B", fontWeight: "600" },
  toggleButtonTextActive: { color: "#fff" },
  contentSection: { backgroundColor: "#fff", padding: 12, borderRadius: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  sectionSubtitle: { color: "#64748B" },
});
