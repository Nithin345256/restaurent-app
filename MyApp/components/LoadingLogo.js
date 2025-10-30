import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LoadingLogo({ size = 96 }) {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}> 
      <Text style={[styles.text, { fontSize: size * 0.42 }]}>A</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
});






