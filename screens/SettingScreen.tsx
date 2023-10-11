import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

interface SettingScreenProps {
  navigation: any; // Replace with the appropriate navigation type
}

const SettingScreen: React.FC<SettingScreenProps> = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={{ marginRight: 15, marginBottom: 3 }}
        >
          <Icon name="arrow-back" color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View>
        <Text style={{color: "#18db69", fontSize: 18}}>Under development</Text>
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
});

export default SettingScreen;
