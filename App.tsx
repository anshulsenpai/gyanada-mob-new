import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider, useAuth } from "./authContext";
import ProfileScreen from "./screens/ProfileScreen";
import StudentForm from "./screens/StudentForm";
import HistoryScreen from "./screens/HistoryScreen";
import StudentDetailPage from "./screens/StudentDetailsScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import SettingScreen from "./screens/SettingScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

function App(): JSX.Element {
  // const token = await AsyncStorage.getItem("token");

  const { state } = useAuth();


  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={state.token ? "Home" : "Login"}>
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{
              title: "Home",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Login",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: "Profile",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StudentForm"
            component={StudentForm}
            options={{
              title: "Student Form",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{
              title: "History",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StudentDetailPage"
            component={StudentDetailPage}
            options={{
              title: "Student Detail",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{
              title: "Forgot Password",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Reset Password"
            component={ResetPasswordScreen}
            options={{
              title: "Forgot Password",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingScreen}
            options={{
              title: "Settings",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
