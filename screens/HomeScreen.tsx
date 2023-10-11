import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { BASE_API_URL } from "../consts/urls";
import { useAuth } from "../authContext";
import StudentListItem from "../components/StudentListItem";
import { useNavigation } from "@react-navigation/native";
import {
  HomeScreenProps,
  IDashboardData,
  IUser,
} from "../interfaces/Interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen: React.FC<HomeScreenProps> = () => {
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
  const [dashboardData, setDashboardData] = useState<IDashboardData>({
    students: [],
    totalCount: 0,
  });
  const { state } = useAuth();
  const { token } = state;
  // navigator
  const navigation = useNavigation();

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const handleAddStudent = () => {
    navigation.navigate("StudentForm");
  };

  const handleShowAll = () => {
    navigation.navigate("History");
  };

  // GET USER
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
  }, [token]);

  //   GET DASHBOARD DATA
  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}/api/web/user/student/history?limit=5`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const { data } = response.data;
        const { students, totalCount } = data;
        setDashboardData({ students, totalCount });
      } catch (error) {
        console.log(error);
      }
    };
    getDashboardData();
  }, [token]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
        <TouchableOpacity onPress={handleProfile} style={styles.profileBtn}>
          <Image
            style={styles.profileImage}
            source={{ uri: `${BASE_API_URL}/uploads/${user.photo}` }} // Replace with the actual URL
          />
        </TouchableOpacity>
      </View>
      <View style={styles.agentCard}>
        <View style={styles.agentDetails}>
          <Text style={styles.agentName}>{user.fullname}</Text>
          <Text style={styles.agentRole}>{user.role}</Text>
        </View>
        <View style={styles.agentStats}>
          <View style={styles.stat}>
            <Text style={styles.statTitle}>Students Added Today</Text>
            <Text style={styles.statValue}>
              {dashboardData.students.length}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statTitle}>Total Students Added</Text>
            <Text style={styles.statValue}>{dashboardData.totalCount}</Text>
          </View>
          <View style={styles.stat}>
            <TouchableOpacity
              style={styles.addStudent}
              onPress={handleAddStudent}
            >
              <Icon name="add-circle" color="#B799FF" size={42} />
              <Text style={styles.statTitle}>Add Student</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={styles.title}>Recently joined students</Text>
      <ScrollView style={styles.recentStudentsList}>
        {dashboardData.students.length === 0 && (
          <Text style={{ fontSize: 18, textAlign: "center", color: "#1e1e1e" }}>
            No student added today
          </Text>
        )}
        {dashboardData.students?.map((item) => (
          <StudentListItem key={item._id} item={item} />
        ))}
        {!(dashboardData.students.length === 0) && (
          <TouchableOpacity onPress={handleShowAll}>
            <Text
              style={{
                textAlign: "center",
                marginVertical: 10,
                ...styles.title,
              }}
            >
              Show All
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  header: {
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  title: {
    fontSize: 14,
    color: "#424242",
    fontFamily: "poppins_semibold",
    marginHorizontal: 15,
    marginTop: 10,
  },
  profileBtn: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFF",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
  },
  agentCard: {
    height: 210,
    marginBottom: 22,
    marginHorizontal: 15,
    marginTop: 8,
    borderRadius: 10,
    padding: 18,
    backgroundColor: "#080202",
  },
  agentDetails: {
    flex: 1,
  },
  agentName: {
    fontSize: 20,
    fontFamily: "poppins_bold",
    margin: 0,
    color: "#FFF",
    textTransform: "capitalize",
  },
  agentRole: {
    margin: 0,
    fontFamily: "poppins",
    color: "#bababa",
    textTransform: "capitalize",
  },
  agentStats: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  stat: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    gap: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  statTitle: {
    fontSize: 11,
    fontFamily: "poppins",
    margin: 0,
    color: "#BABABA",
    textAlign: "center",
  },
  statValue: {
    fontSize: 20,
    fontFamily: "poppins_bold",
    color: "#B799FF",
    textAlign: "center",
  },
  addStudent: {
    justifyContent: "center",
    alignItems: "center",
  },
  recentStudentsList: {
    margin: 15,
  },
});

export default HomeScreen;
