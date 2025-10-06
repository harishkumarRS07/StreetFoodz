import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { router } from "expo-router";

const StreetFoodApp = () => {
  return (
    <View style={styles.container}>
    
      <View style={styles.image_container}>
        <ImageBackground
          source={require('../../assets/images/lo.jpeg')}
          
          style={styles.background_image}
          imageStyle={styles.image_style}
        >
          <View style={styles.indicator_container}>
            <View style={styles.indicator_active}></View>
            <View style={styles.indicator}></View>
            <View style={styles.indicator}></View>
            <View style={styles.indicator}></View>
            <View style={styles.indicator}></View>
          </View>
        </ImageBackground>
      </View>

      {/* Title */}
      <Text style={styles.title}>Discover the best street food in your city</Text>

      {/* Buttons */}
      <View style={styles.button_container}>
        <TouchableOpacity
          style={styles.transparent_button}
          onPress={() => router.push('/auth/Signin')}

        >
          <Text style={styles.transparent_button_text}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Terms and Conditions */}
      <Text style={styles.terms_text}>
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  image_container: {
    paddingHorizontal: 19,
    paddingVertical: 27,
  },
  background_image: {
    height: 300,
    justifyContent: "flex-end",
    borderRadius: 16,
    overflow: "hidden",
  },
  image_style: {
    borderRadius: 16,
  },
  indicator_container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 12,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
    opacity: 0.5,
    marginHorizontal: 4,
  },
  indicator_active: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
    marginHorizontal: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#181411",
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  button_container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  transparent_button: {
    height: 40,
    borderRadius: 24,
    borderColor: "#181411",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  transparent_button_text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#181411",
  },
  terms_text: {
    fontSize: 12,
    color: "#897361",
    textAlign: "center",
    paddingBottom: 16,
  },
});

export default StreetFoodApp;
