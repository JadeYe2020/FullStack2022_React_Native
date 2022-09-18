import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { View, FlatList, StyleSheet } from "react-native";
import { format } from "date-fns";
import Text from "./Text";
import theme from "../theme";
import useRepository from "../hooks/useRepository";
import useRepoReviews from "../hooks/useRepoReviews";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 100,
  },
  reviewItem: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
  },
  rating: {
    marginRight: 10,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    flexDirection: "column",
    flex: 1,
    margin: 10,
    marginTop: 0,
    justifyContent: "flex-start",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RenderItem = ({ item }) => {
  if (!item) {
    return <Text>loading</Text>;
  }

  return (
    <View style={styles.reviewItem}>
      <View style={styles.rating}>
        <Text color="primary" fontWeight="bold">
          {item.rating}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text fontSize="subheading" fontWeight="bold">
          {item.user.username}
        </Text>
        <Text color="textSecondary" style={{ marginTop: 5, marginBottom: 10 }}>
          {format(Date.parse(item.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text>{item.text}</Text>
      </View>
    </View>
  );
};

const SingleRepoContainer = ({ repo, reviews }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  // console.log("reviewNodes", reviewNodes);

  return (
    <View style={styles.flexContainer}>
      <FlatList
        data={reviewNodes}
        ListHeaderComponent={() => (
          <RepositoryItem item={repo} isSingleView={true} />
        )}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RenderItem item={item} />}
      />
    </View>
  );
};

const SingleRepo = () => {
  const id = useParams().id;
  const { repoItem } = useRepository(id);
  const { reviews } = useRepoReviews(id);

  if (!repoItem) {
    return <Text>loading</Text>;
  }

  return <SingleRepoContainer repo={repoItem} reviews={reviews} />;
};

export default SingleRepo;
