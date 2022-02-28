import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./routes/homestack.js";
import { NavigationContainer } from "@react-navigation/native";
import { globalStyles } from "./styles/global.js";
import Parse from "parse/react-native.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Initializing the SDK.
Parse.setAsyncStorage(AsyncStorage);
//You need to copy BOTH the the Application ID and the Javascript Key from: Dashboard->App Settings->Security & Keys
Parse.initialize(
  "Wz1yxFis7n7QWzhu3A28jhIPyNpXbRsLvGGcvqHd",
  "KiugghTaAX5yZwn9QkUyokcfZ8thp3DLCntjFqMM"
);
Parse.serverURL = "https://parseapi.back4app.com/";

export default function App() {
  return (
    <View style={globalStyles.containernopad}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     // alignItems: "center",
//     // justifyContent: "center",
//   },
// });
