import React from "react";
import WebView from "react-native-webview";
import { useAuth } from "../authContext";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FORM_URL } from "../consts/urls";
import Icon from "react-native-vector-icons/Ionicons";


const StudentForm: React.FC = () => {
  const navigation = useNavigation();
  const { state } = useAuth();
  const { token } = state;

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={{ marginRight: 15, marginBottom: 15 }}
        >
          <Text>Back</Text>
          <Icon name="arrow-back" color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Student</Text>
      </View>
      <WebView
        source={{
          uri: `${FORM_URL}/native-form/?token=${token}`,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
});

export default StudentForm;
