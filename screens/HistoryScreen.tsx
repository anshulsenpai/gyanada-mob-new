import { FontAwesome5 } from "@expo/vector-icons";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StudentListItem from "../components/StudentListItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../consts/urls";
import { useAuth } from "../authContext";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const HistoryScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [studentsData, setStudentsData] = useState([]);
  const { state } = useAuth();
  const { token } = state;
  const navigation = useNavigation();
  // console.log(token)

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const getStudentHistory = async () => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}/api/web/user/student?search=&selectedFilter=&filterValue=&page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const { data } = response.data;
        const { totalCount } = data;
        setStudentsData(data.students);
        setTotalPages(Math.ceil(totalCount / 10));
      } catch (error) {
        console.log(error);
      }
    };
    getStudentHistory();
  }, [currentPage]);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={{ marginRight: 15, marginBottom: 0 }}
        >
          <Icon name="arrow-back" color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Total Students</Text>
      </View>
      <ScrollView style={styles.studentList}>
        {studentsData.length === 0 && (
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            No data found
          </Text>
        )}
        {studentsData?.map((item) => (
          <StudentListItem key={item._id} item={item} />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
          alignItems: "center",
          margin: 15,
        }}
      >
        {/* Pagination */}
        <TouchableOpacity
          style={[
            styles.button,
            currentPage === 1 && styles.disabledButton, // Apply disabledButton style if currentPage is 1
          ]}
          onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        {generatePageNumbers().map((pageNumber) => (
          <TouchableOpacity
            key={pageNumber}
            onPress={() => setCurrentPage(pageNumber)}
          >
            <Text style={{ ...styles.buttonText, color: "#000" }}>
              {pageNumber}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[
            styles.button,
            currentPage === totalPages && styles.disabledButton, // Apply disabledButton style if currentPage is equal to totalPages
          ]}
          onPress={() =>
            setCurrentPage((prev) =>
              prev < totalPages ? prev + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    color: "#191825",
    textTransform: "capitalize",
    textShadowColor: "rgba(0, 0, 0, 0.10)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 20,
  },
  studentList: {
    margin: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#713ABE",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
  },
});

export default HistoryScreen;
