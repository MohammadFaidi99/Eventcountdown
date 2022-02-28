import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import events from "../screens/events.js";
import event from "../screens/event.js";
import Header from "../components/header";
import { Ionicons } from "@expo/vector-icons";

export default function homestack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerStyle: {
            backgroundColor: "#00BFB2",
          },
        }}
      >
        <Stack.Screen
          name="Events"
          component={events}
          options={{
            headerTitle: () => <Header />,
          }}
        />
        <Stack.Screen
          name="Event"
          component={event}
          options={({ route }) => ({
            title: route.params.title,
            headerTintColor: "white",
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

// const styles = StyleSheet.create({
//   title: {
//     flexDirection: "row",
//     backgroundColor: "#00BFB2",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "white",
//   },
// });
// headerTitle: () => <Header />,
