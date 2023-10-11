import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const ResetPasswordScreen: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    // Add your logic to handle password reset here
    console.log("Reset password clicked for email:", {
      password,
      confirmPassword,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.desc}>Enter the new password</Text>
      <TextInput
        placeholder="New Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="default"
        secureTextEntry={true}
        placeholderTextColor="#525252" // Change the placeholder text color
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="default"
        secureTextEntry={true}
        placeholderTextColor="#525252" // Change the placeholder text color
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 100,
    color: "#1c1c1c",
    // textAlign: "left" // Change the title text color
  },
  desc: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 30,
    color: "#545454",
    // textAlign: "left"
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    color: "#1c1c1c", // Change the input text color
  },
  button: {
    backgroundColor: "#16B596",
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ResetPasswordScreen;
