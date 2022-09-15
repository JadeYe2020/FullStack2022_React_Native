import { View, StyleSheet, Image, Pressable, Button } from "react-native";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  itemContainer: {
    flexGrow: 0,
    padding: 10,
    backgroundColor: "white",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  infoContainer: {
    flexDirection: "column",
    flex: 1,
    margin: 10,
    marginTop: 0,
    justifyContent: "flex-start",
  },
  infoItem: {
    padding: 5,
  },
  languageTag: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  statsItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  separator: {
    height: 10,
  },
});

const StatsItem = ({ typeOfCount, count }) => {
  let countFormatted = count.toString();
  if (count > 1000) {
    count = Math.round(count / 100) / 10;
    countFormatted = count.toString() + "k";
  }

  return (
    <View style={styles.statsItem}>
      <Text fontWeight="bold">{countFormatted}</Text>
      <Text style={{ margin: 5 }} color="textSecondary">
        {typeOfCount}
      </Text>
    </View>
  );
};

const RepositoryItem = ({ item, isSingleView }) => {
  const navigate = useNavigate();

  const openSingleRepo = (id) => {
    navigate(`/repositories/${id}`, { replace: true });
  };

  const openGitHub = () => {
    Linking.openURL(item.url);
  };

  return (
    <View>
      <Pressable
        testID="repositoryItem"
        onPress={isSingleView ? () => {} : () => openSingleRepo(item.id)}
        style={styles.itemContainer}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.avatar}
            source={{
              uri: item.ownerAvatarUrl,
            }}
          />
          <View style={styles.infoContainer}>
            <Text fontWeight="bold">{item.fullName}</Text>
            <Text
              style={{ marginTop: 10, marginBottom: 10 }}
              color="textSecondary"
            >
              {item.description}
            </Text>
            <View style={{ alignItems: "baseline" }}>
              <View style={styles.languageTag}>
                <Text style={{ color: "white" }}>{item.language}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <StatsItem typeOfCount="Stars" count={item.stargazersCount} />
          <StatsItem typeOfCount="Forks" count={item.forksCount} />
          <StatsItem typeOfCount="Reviews" count={item.reviewCount} />
          <StatsItem typeOfCount="Rating" count={item.ratingAverage} />
        </View>
        {isSingleView && (
          <View>
            <Button onPress={openGitHub} title="Open in GitHub"></Button>
          </View>
        )}
      </Pressable>
      {isSingleView && <View style={styles.separator} />}
    </View>
  );
};

export default RepositoryItem;
