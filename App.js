import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const App = () => {
  const [numberPlate, setNumberPlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
  const [isError, setIsError] = useState(null);

  const fetchVehicleData = async () => {
    if (!numberPlate) {
      Alert.alert("Please enter a number plate");
      return;
    }

    setIsLoading(true);

    try {
      // Replace YOUR_API_KEY with your actual API key
      const apiKey = "61BT22ukpJ9vHkYcf3yWi3dFsjsvwcRB1aotzqMT";

      const data = JSON.stringify({ registrationNumber: numberPlate });
      const config = {
        method: "post",
        url: "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          const {
            motStatus,
            motExpiryDate,
            taxStatus,
            taxDueDate,
            make,
            yearOfManufacture,
            fuelType,
            colour,
          } = response.data;

          setVehicleData([
            {
              label: "MOT Status",
              data:
                motStatus === "Valid" ? `${motStatus} ✅` : `${motStatus} ❌`,
            },
            {
              label: "MOT Expiry Date",
              data: motExpiryDate,
            },
            {
              label: "Tax Status",
              data:
                taxStatus === "Taxed" ? `${taxStatus} ✅` : `${taxStatus} ❌`,
            },
            {
              label: "Tax Due Date",
              data: taxDueDate,
            },
            {
              label: "Make",
              data: make,
            },
            {
              label: "Year of Manufacture",
              data: yearOfManufacture,
            },
            {
              label: "Fuel Type",
              data: fuelType,
            },
            {
              label: "Colour",
              data: colour,
            },
          ]);

          setIsError(false);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
          setVehicleData(null);
        });
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to fetch vehicle data");
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle MOT & Tax Status</Text>
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

      {isLoading === true ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        vehicleData && (
          <ScrollView
            contentContainerStyle={styles.vehicleData}
            showsVerticalScrollIndicator={false}
          >
            {vehicleData.map((item) => {
              return (
                <View style={styles.dataItemContainer}>
                  <Text style={styles.dataItemLabel}>{`${item.label}: `}</Text>
                  <Text style={styles.dataItemValue}>{item.data}</Text>
                </View>
              );
            })}
          </ScrollView>
        )
      )}

      {isError === true && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Error retrieving vehicle information, please double check the number
            plate has been entered correctly
          </Text>
        </View>
      )}
    </View>
  );
};

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
    marginBottom: 30,
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

export default App;
