import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { BASE_API_URL } from "../consts/urls";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

interface StudentDetailPageProps {
  route: RouteProp<RootStackParamList, "StudentDetail">;
  navigation: StackNavigationProp<RootStackParamList, "StudentDetail">;
}

interface StudentData {
  firstname: string;
  middlename: string;
  lastname: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  pincode: string;
  studentClass: string;
  schoolName: string;
  schoolCity: string;
  schoolAddress: string;
  schoolPincode: string;
}

interface RootStackParamList {
  StudentDetail: { item: StudentData };
}

const StudentDetailPage: React.FC<StudentDetailPageProps> = ({
  route,
  navigation,
}) => {
  // Extract the item data from the route params
  const { item } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={{ marginRight: 15, marginBottom: 3 }}
        >
          <Icon name="arrow-back" color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Student Details</Text>
      </View>
      <View style={styles.studentDetails}>
        <Text style={styles.title}>Basic Details</Text>
        <View style={styles.detailsContainer}>
          <View>
            <View style={styles.detailsContainer.subContainer}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.labelValue}>
                {item?.firstname} {item?.middlename} {item?.lastname}
              </Text>
            </View>
            <View style={styles.detailsContainer.subContainer}>
              <Text style={styles.label}>Gender</Text>
              <Text style={styles.labelValue}>{item?.gender}</Text>
            </View>
            <View style={styles.detailsContainer.subContainer}>
              <Text style={styles.label}>Date Of Birth</Text>
              <Text style={styles.labelValue}>
                {item?.dateOfBirth.split("T")[0]}
              </Text>
            </View>
          </View>
          <Image
            style={styles.profilePhoto}
            source={{ uri: `${BASE_API_URL}/uploads/` }}
          />
        </View>
        <Text style={styles.title}>Contact Details</Text>
        <View
          style={{
            ...styles.detailsContainer,
            justifyContent: "start",
            gap: 20,
          }}
        >
          <View>
            <Text style={styles.label}>Phone no.</Text>
            <Text style={styles.labelValue}>{item?.phone}</Text>
          </View>
          <View>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.labelValue}>{item?.email}</Text>
          </View>
          <View>
            <Text style={styles.label}>City</Text>
            <Text style={styles.labelValue}>{item?.city}</Text>
          </View>
        </View>
        <View
          style={{
            ...styles.detailsContainer,
            justifyContent: "start",
            gap: 20,
          }}
        >
          <View>
            <Text style={styles.label}>Address</Text>
            <Text style={{ ...styles.labelValue, width: 180 }}>
              {item?.address}
            </Text>
          </View>
          <View>
            <Text style={styles.label}>PIN Code</Text>
            <Text style={styles.labelValue}>{item?.pincode}</Text>
          </View>
        </View>
        <Text style={styles.title}>Educational Details</Text>
        <View
          style={{
            ...styles.detailsContainer,
            justifyContent: "start",
            gap: 30,
          }}
        >
          <View>
            <Text style={styles.label}>Class</Text>
            <Text style={styles.labelValue}>{item?.studentClass}</Text>
          </View>
          <View>
            <Text style={styles.label}>School/College Name</Text>
            <Text style={styles.labelValue}>{item?.schoolName}</Text>
          </View>
        </View>
        <View
          style={{
            ...styles.detailsContainer,
            justifyContent: "start",
            gap: 30,
          }}
        >
          <View>
            <Text style={styles.label}>School/College City</Text>
            <Text style={styles.labelValue}>{item?.schoolCity}</Text>
          </View>
          <View>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.labelValue}>{item?.schoolAddress}</Text>
          </View>
        </View>
        <View
          style={{
            ...styles.detailsContainer,
            justifyContent: "start",
            gap: 30,
          }}
        >
          <View>
            <Text style={styles.label}>School/College PIN code</Text>
            <Text style={styles.labelValue}>{item?.schoolPincode}</Text>
          </View>
          <View>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.labelValue}>{item?.schoolAddress}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  studentDetails: {
    padding: 20,
  },
  detailsContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    marginVertical: 10,
    marginBottom: 20,
  },
  profilePhoto: {
    width: 120,
    height: 150,
    // borderRadius: 70,
    backgroundColor: "#ddd",
  },
  label: {
    color: "#1A163A",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  labelValue: {
    color: "#727d89",
    fontSize: 16,
    // textTransform: "capitalize",
  },
  title: {
    color: "#713ABE",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default StudentDetailPage;
