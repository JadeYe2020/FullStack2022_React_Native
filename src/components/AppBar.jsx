import { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link, useNavigate } from "react-router-native";
import Text from "./Text";
import Constants from "expo-constants";
import { useQuery } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";

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

const Tab = ({ title, linkPath, onPress }) => {
  return (
    <Pressable style={styles.flexItem} onPress={onPress}>
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
  const [user, setUser] = useState(null);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const result = useQuery(CURRENT_USER);

  useEffect(() => {
    let me = null;
    if (result.data) {
      me = result.data.me;
      setUser(me);
    }
  }, [result]);

  const navigate = useNavigate();

  const onSignOut = async () => {
    // console.log("sign out");
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/signin", { replace: true });
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          <Tab title="Repositories" linkPath="/" />
          <Tab title="Sign In" linkPath="/signin" />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Tab title="Repositories" linkPath="/" />
        <Tab title="Create a review" linkPath="/review" />
        <Pressable style={styles.flexItem} onPress={onSignOut}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            style={{ color: "white" }}
          >
            Sign Out
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;
