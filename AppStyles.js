// AppStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#6200ee",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
  },
  button: {
    backgroundColor: "#6200ee",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  vehicleData: {
    width: "80%",
    maxWidth: "80%",
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6200ee",
    borderRadius: 10,
  },
  dataItemContainer: {
    flexDirection: "row",
    padding: 5,
  },
  dataItemLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 600,
  },
  dataItemValue: {
    fontSize: 18,
    marginBottom: 10,
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#cc0000",
  },
});

export default styles;
