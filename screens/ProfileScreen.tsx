import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useAuth } from "../authContext";
import { BASE_API_URL } from "../consts/urls";
import { IUser } from "../interfaces/Interfaces";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };
  const [user, setUser] = useState<IUser>({
    _id: "",
    address: "",
    dateOfBirth: "",
    email: "",
    fullname: "",
    mobile: "",
    password: "",
    photo: "",
    role: "",
    status: false,
  });

  const { state, dispatch } = useAuth();
  const { token } = state;

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/web/my-profile`, {
          headers: {
            Authorization: token,
          },
        });
        const { data } = response.data;
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const handleLogout = () => {
    dispatch({ type: "SIGN_OUT" });
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={{ marginRight: 15, marginBottom: 3 }}
        >
          <Icon name="arrow-back" color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Profile</Text>
      </View>
      <View style={styles.profile}>
        <View style={styles.profilePhotoContainer}>
          <Image
            style={styles.profilePhoto}
            source={{ uri: `${BASE_API_URL}/uploads/${user.photo}` }} // Replace with the actual URL
          />
        </View>
        <ScrollView style={{ marginVertical: 20 }}>
          <Text style={styles.title}>General Details</Text>
          <View style={styles.profileDetails}>
            <View style={styles.profileDataContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                {/* User icon */}
                <Text style={styles.key}>Fullname</Text>
              </View>
              <Text style={{ ...styles.value, textTransform: "capitalize" }}>
                {user.fullname}
              </Text>
            </View>
            <View style={styles.profileDataContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                {/* Role icon */}
                <Text style={styles.key}>Role</Text>
              </View>
              <Text style={styles.value}>{user.role}</Text>
            </View>
          </View>
          <View style={styles.profileDetails}>
            <View style={styles.profileDataContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                {/* Date of Birth icon */}
                <Text style={styles.key}>Date of Birth</Text>
              </View>
              <Text style={styles.value}>{user.dateOfBirth.split("T")[0]}</Text>
            </View>
            <View style={styles.profileDataContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                {/* Active icon */}
                <Text style={styles.key}>Active</Text>
              </View>
              <Text style={styles.value}>{user.status ? "Active" : ""}</Text>
            </View>
          </View>
          <Text style={styles.title}>Contact Details</Text>
          <View style={styles.profileDetails}>
            <View style={styles.profileDataContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                {/* Email icon */}
                <Text style={styles.key}>Email</Text>
              </View>
              <Text style={styles.value}>{user.email}</Text>
            </View>
            <View style={styles.profileDataContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                {/* Mobile icon */}
                <Text style={styles.key}>Mobile No.</Text>
              </View>
              <Text style={styles.value}>{user.mobile}</Text>
            </View>
          </View>
          <View style={styles.profileDetails}>
            <View style={styles.profileDataContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                {/* Location icon */}
                <Text style={styles.key}>Address</Text>
              </View>
              <Text style={styles.value}>{user.address}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              padding: 12,
              backgroundColor: "#BB2525",
              borderRadius: 5,
              marginBottom: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#FFF",
                fontFamily: "poppins_semibold",
                textAlign: "center",
                marginTop: 3,
              }}
            >
              Log Out
            </Text>
            {/* Logout icon */}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 15,
    backgroundColor: "#FFF",
  },
  headerText: {
    fontSize: 22,
    fontFamily: "poppins_semibold",
    color: "#191825",
    textTransform: "capitalize",
    textShadowColor: "rgba(0, 0, 0, 0.10)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 20,
  },

  profile: {
    flex: 1,
    margin: 15,
  },
  profilePhotoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    color: "#424242",
    fontFamily: "poppins_semibold",
    marginTop: 20,
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#ddd",
  },
  profileDetails: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  profileDataContainer: {
    flex: 1,
    marginBottom: 10,
    paddingVertical: 10,
  },
  key: {
    fontSize: 14,
    color: "#191825",
    fontFamily: "poppins_semibold",
  },
  value: {
    fontSize: 14,
    color: "#424242",
    fontFamily: "poppins_semibold",
  },
});

export default ProfileScreen;
