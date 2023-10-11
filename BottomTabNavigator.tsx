import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import StudentForm from "./screens/StudentForm";
import SettingScreen from "./screens/SettingScreen";
import Icon from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          justifyContent: "space-between",
          alignItems: "center",
          height: 60,
          backgroundColor: "#FFF",
          margin: 5,
          borderRadius: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <Icon
                name="home"
                color={focused ? color : "#bababa"}
                size={(size = 26)}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <MaterialIcon
                name="history"
                color={focused ? color : "#bababa"}
                size={(size = 26)}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="StudentForm"
        component={StudentForm}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <Ionicons
                name="add-circle"
                color={focused ? color : "#bababa"}
                size={(size = 26)}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <Ionicons
                name="settings"
                color={focused ? color : "#bababa"}
                size={(size = 26)}
              />
            );
          },
        }}
      />
      {/* <Tab.Screen
        name="StudentDetailPage"
        component={StudentDetailPage}
        options={{
          headerShown: false,
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
