import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2024 CService - Restaurant Management</Text>
      <Text style={styles.footerSubtext}>Powered by React Native & Node.js</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#F9FAFB",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
    alignItems: "center",
  },
  footerText: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  footerSubtext: {
    color: "#6B7280",
    fontSize: 11,
  },
});