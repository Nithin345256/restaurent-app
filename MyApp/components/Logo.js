import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Logo({ size = 72 }) {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}> 
      <Text style={[styles.emoji, { fontSize: size * 0.5 }]}>🍽️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    textAlign: "center",
  },
});


