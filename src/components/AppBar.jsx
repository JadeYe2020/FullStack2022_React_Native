import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: "row",
    backgroundColor: "#24292e",
    paddingBottom: 15,
  },
  flexItem: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.flexItem}>
        <Text
          fontWeight="bold"
          fontSize="subheading"
          style={{ color: "white" }}
        >
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
