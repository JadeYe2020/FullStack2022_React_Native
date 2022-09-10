import { View, StyleSheet, Pressable } from "react-native";
import { Link } from "react-router-native";
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
    flexGrow: 0,
    paddingHorizontal: 10,
    alignContent: "center",
  },
});

const Tab = ({ title, linkPath }) => {
  return (
    <Pressable style={styles.flexItem}>
      <Link to={linkPath}>
        <Text
          fontWeight="bold"
          fontSize="subheading"
          style={{ color: "white" }}
        >
          {title}
        </Text>
      </Link>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Tab title="Repositories" linkPath="/" />
      <Tab title="Sign In" linkPath="/signin" />
    </View>
  );
};

export default AppBar;
