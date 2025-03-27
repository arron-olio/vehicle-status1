import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import styles from "./AppStyles";

const App = () => {
  const [numberPlate, setNumberPlate] = useState("");
  const [prevNumberPlate, setPrevNumberPlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
  const [isError, setIsError] = useState(null);
  const [fadeInValue] = useState(new Animated.Value(0));

  const fetchVehicleData = async () => {
    if (!numberPlate) {
      Alert.alert("Please enter a number plate");
      return;
    }

    if (numberPlate !== prevNumberPlate) {
      console.log("aron ht");
      setIsLoading(true);

      try {
        const apiKey = "<your api key here>";

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
            setPrevNumberPlate(numberPlate);
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
      fadeInValue.setValue(0);
    }
  };

  useEffect(() => {
    if (vehicleData) {
      Animated.timing(fadeInValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [vehicleData]);

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
          {isLoading === true ? "Loading..." : "Check Vehicle Status"}
        </Text>
      </TouchableOpacity>

      {isLoading === true ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        vehicleData && (
          <Animated.ScrollView
            contentContainerStyle={styles.vehicleData}
            showsVerticalScrollIndicator={false}
            style={{ opacity: fadeInValue }}
          >
            {vehicleData.map((item) => {
              return (
                <View key={item.label} style={styles.dataItemContainer}>
                  <Text style={styles.dataItemLabel}>{`${item.label}: `}</Text>
                  <Text style={styles.dataItemValue}>{item.data}</Text>
                </View>
              );
            })}
          </Animated.ScrollView>
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

export default App;
