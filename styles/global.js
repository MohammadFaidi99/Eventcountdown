import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  containernopad: {
    flex: 1,
  },
  center: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  titleText: {
    fontSize: 20,
    color: "#00BFB2",
  },
  input: {
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderBottomWidth: 1,
    marginBottom: 8,
  },
});
