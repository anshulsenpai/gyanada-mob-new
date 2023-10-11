import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import icon from "../assets/logo.png"; // Import your company logo image here
import axios from "axios";
import { BASE_API_URL } from "../consts/urls";
import { useAuth } from "../authContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkUserDetails, setCheckUserDetails] = useState({
    isEmail: false,
    isPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, isError] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const navigation = useNavigation();
  const { dispatch, state } = useAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (email && password) {
        const response = await axios.post(`${BASE_API_URL}/api/web/login`, {
          email,
          password,
        });
        const { token } = response.data.data;
        dispatch({ type: "SIGN_IN", token: token });
        setIsLoading(false);
        navigation.navigate("Home");
        console.log("login success");
      } else {
        setCheckUserDetails({
          ...checkUserDetails,
          isEmail: !email ? true : false,
          isPassword: !password ? true : false,
        });
        setIsLoading(false);
        setEmptyField(true);
      }
    } catch (error) {
      isError(true);
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  useEffect(() => {
    setCheckUserDetails({
      ...checkUserDetails,
      isEmail: !email ? true : false,
      isPassword: !password ? true : false,
    });
    setEmptyField(false);
  }, [email, password]);

  useEffect(() => {
    setCheckUserDetails({
      ...checkUserDetails,
      isEmail: false,
      isPassword: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={icon} style={styles.logo} />
      </View>
      <Text style={styles.titleText}>
        Welcome to Gyanada Institutes, Please enter your login details
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          ...styles.input,
          borderColor: checkUserDetails.isEmail ? "#cd0000" : "#ccc",
        }}
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          ...styles.input,
          borderColor: checkUserDetails.isPassword ? "#cd0000" : "#ccc",
        }}
        autoCapitalize="none"
        secureTextEntry={true}
        placeholderTextColor="#888"
      />
      {emptyField && (
        <Text style={styles.errorText}>Each field is required</Text>
      )}

      {error && (
        <Text style={styles.errorText}>
          Please enter valid email and password
        </Text>
      )}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  titleText: {
    width: "80%",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 30,
    color: "#727272",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  input: {
    width: "100%",
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    color: "#2e2e2e",
  },
  buttonContainer: {
    backgroundColor: "#16B596",
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#1F202B",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordLink: {
    marginTop: 20,
    color: "#0A0944",
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
