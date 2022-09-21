import { View, FlatList, StyleSheet } from "react-native";
import { format } from "date-fns";
import Text from "./Text";
import theme from "../theme";
import useUserReviews from "../hooks/useUserReviews";

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

const ReviewItem = ({ item }) => {
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
          {item.repository.fullName}
        </Text>
        <Text color="textSecondary" style={{ marginTop: 5, marginBottom: 10 }}>
          {format(Date.parse(item.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text>{item.text}</Text>
      </View>
    </View>
  );
};

const MyReviewsContainer = ({ reviews }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <View style={styles.flexContainer}>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem item={item} />}
      />
    </View>
  );
};

const MyReviews = () => {
  const { reviews } = useUserReviews({
    includeReviews: true,
  });

  if (!reviews) {
    return <Text>loading</Text>;
  }

  return <MyReviewsContainer reviews={reviews} />;
};

export default MyReviews;
