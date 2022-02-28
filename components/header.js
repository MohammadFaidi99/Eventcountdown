import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Eventcounter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    letterSpacing: 1,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#00BFB2",
    justifyContent: "center",
    alignItems: "center",
  },
});
