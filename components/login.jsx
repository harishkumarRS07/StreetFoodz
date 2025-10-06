import { useRouter } from "expo-router";
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const StreetFoodApp = () => {
  const router=useRouter();
    
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Street Food</Text>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Welcome to Street Food</Text>
        <Text style={styles.welcomeDescription}>
          The best street food in the city is just a few taps away. Sign up to order now.
        </Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="#897361"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password"
            style={styles.input}
            placeholderTextColor="#897361"
            secureTextEntry
          />
        </View>
      </View>

      {/* Sign Up Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Terms & Conditions */}
      <Text style={styles.termsText}>
        By continuing, you agree to the Terms of Use and Privacy Policy.
      </Text>

      {/* Bottom Section with Arrow Button */}
      <View style={styles.arrowButtonContainer}>
        <TouchableOpacity style={styles.arrowButton}>
          <Text style={styles.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    backgroundColor: "white",
    paddingVertical: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#181411",
  },
  welcomeContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#181411",
    textAlign: "center",
  },
  welcomeDescription: {
    fontSize: 16,
    color: "#181411",
    textAlign: "center",
    marginVertical: 8,
  },
  inputContainer: {
    paddingHorizontal: 16,
  },
  inputWrapper: {
    marginBottom: 12,
    backgroundColor: "#f4f2f0",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    color: "#181411",
    fontSize: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
  },
  signUpButton: {
    backgroundColor: "#ee7f2b",
    height: 48,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpButtonText: {
    color: "#181411",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    color: "#897361",
    fontSize: 12,
    textAlign: "center",
    paddingVertical: 12,
  },
  arrowButtonContainer: {
    alignItems: "flex-end",
    paddingHorizontal: 16,
  },
  arrowButton: {
    backgroundColor: "#ee7f2b",
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: {
    fontSize: 24,
    color: "#181411",
  },
});

export default StreetFoodApp;
