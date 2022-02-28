import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ddd",
    borderRadius: 8,
    elevation: 2,
    shadowOffset: { height: 20, width: 20 },
    marginBottom: 10,
  },
  cardContent: {
    padding: 20,
  },
});
