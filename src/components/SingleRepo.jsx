import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { View, FlatList, StyleSheet } from "react-native";
import Text from "./Text";
import useRepository from "../hooks/useRepository";
import useRepoReviews from "../hooks/useRepoReviews";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepoContainer = ({ repo, reviews }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  console.log("reviewNodes", reviewNodes);

  const renderItem = ({ item }) => {
    if (!item) {
      return <Text>loading</Text>;
    }

    return <Text>{item.text}</Text>;
  };

  return (
    <View style={styles.flexContainer}>
      <FlatList
        data={reviewNodes}
        ListHeaderComponent={() => (
          <RepositoryItem item={repo} isSingleView={true} />
        )}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
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
