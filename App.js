import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";

const App = () => {
  const [numberPlate, setNumberPlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchVehicleData = async () => {
    if (!numberPlate) {
      Alert.alert("Error", "Please enter a number plate");
      return;
    }

    setIsLoading(true);

    try {
      // Replace YOUR_API_KEY with your actual API key
      const apiKey = "YOUR_API_KEY";
      const motUrl = `https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${numberPlate}`;
      const taxUrl = `https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles`;

      const motConfig = {
        headers: {
          "x-api-key": apiKey,
        },
      };

      const taxConfig = {
        headers: {
          "x-api-key": apiKey,
        },
        data: { registrationNumber: numberPlate },
      };

      const [motResponse, taxResponse] = await Promise.all([
        axios.get(motUrl, motConfig),
        axios.post(taxUrl, taxConfig),
      ]);

      const motData = motResponse.data[0];
      const taxData = taxResponse.data;

      Alert.alert(
        "Vehicle Information",
        `MOT Status: ${motData.status}\nMOT Notes: ${motData.notes}\nTax Status: ${taxData.taxStatus}`
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch vehicle data");
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle Status App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number plate"
        value={numberPlate}
        onChangeText={setNumberPlate}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={fetchVehicleData}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Loading..." : "Check Vehicle Status"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default App;
