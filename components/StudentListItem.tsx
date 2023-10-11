import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../authContext";
import { BASE_API_URL } from "../consts/urls";

interface StudentListItemProps {
  item: any; // Adjust the type as per your data structure
}

const StudentListItem: React.FC<StudentListItemProps> = ({ item }) => {
  const { state, dispatch } = useAuth();
  const { token } = state;
  const navigation = useNavigation();
  const [base64data, setBase64Data] = useState<{ type: string; data: string }>();
  const [type, setType] = useState<string>();

  const handleStudentClick = (item: any) => {
    navigation.navigate("StudentDetailPage", { item });
  };

  useEffect(() => {
    const getStudentImage = async () => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}/api/web/user/student/image/${item._id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const { data } = response.data;
        setBase64Data(data);
      } catch (error) {
        console.log(error);
      }
    };
    getStudentImage();
  }, []);

  const dataUri = `data:${base64data?.type};base64,${base64data?.data}`;

  return (
    <TouchableOpacity
      onPress={() => handleStudentClick(item)}
      key={item?._id}
      style={[
        styles.studentListItem,
        Platform.OS === "android" ? styles.androidShadow : styles.iosShadow,
      ]}
    >
      <Image style={styles.photo} source={{ uri: dataUri }} />

      <View style={styles.studentDetails}>
        <Text style={styles.studentName}>
          {`${item?.firstname} ${item?.lastname}`}
        </Text>
        <View style={styles.detailsRow}>
          <Text style={styles.otherDetails}>{item?.email}</Text>
          <Text style={styles.otherDetails}>{item?.phone}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.otherDetails}>{item?.studentClass}</Text>
          <Text style={styles.otherDetails}>{item?.city}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  studentListItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "white",
    height: 110,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: "#ddd",
  },
  studentDetails: {
    flex: 1,
    marginLeft: 10,
  },
  studentName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1A163A",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "start",
    marginBottom: 5,
    gap: 8,
  },
  otherDetails: {
    fontSize: 14,
    color: "#727d89",
  },
});

export default StudentListItem;
