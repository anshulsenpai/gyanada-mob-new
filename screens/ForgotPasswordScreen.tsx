import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface ForgotPasswordScreenProps {
  navigation: any; // Adjust the type as per your navigation setup
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState<string>("");

  const handleResetPassword = () => {
    navigation.navigate("Reset Password");
    console.log("Reset password clicked for email:", email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.desc}>Enter the registered email address</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#8d8d8d"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 100,
    color: "#1c1c1c",
  },
  desc: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 30,
    color: "#727272",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    color: "#727272",
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

export default ForgotPasswordScreen;
