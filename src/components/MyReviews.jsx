import { View, FlatList, StyleSheet, Pressable, Alert } from "react-native";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";
import Text from "./Text";
import theme from "../theme";
import useUserReviews from "../hooks/useUserReviews";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 100,
  },
  itemContainer: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: "white",
  },
  reviewDetails: {
    flexDirection: "row",
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  regularButton: {
    width: "45%",
    borderRadius: 5,
    marginVertical: 8,
    padding: 16,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
    textAlign: "center",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ item, refetch }) => {
  const navigate = useNavigate();
  const [removeReview] = useDeleteReview();

  if (!item) {
    return <Text>loading</Text>;
  }

  const viewRepo = () => {
    const id = item.repository.id;
    navigate(`/repositories/${id}`);
  };

  const deleteAlert = () => {
    const deleteReview = async () => {
      try {
        const hasDeleted = await removeReview(item.id);
        if (hasDeleted) {
          refetch({ includeReviews: true });
        }
      } catch (e) {
        console.log(e);
      }
    };

    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Delete", onPress: () => deleteReview() },
      ]
    );
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.reviewDetails}>
        <View style={styles.rating}>
          <Text color="primary" fontWeight="bold">
            {item.rating}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text fontSize="subheading" fontWeight="bold">
            {item.repository.fullName}
          </Text>
          <Text
            color="textSecondary"
            style={{ marginTop: 5, marginBottom: 10 }}
          >
            {format(Date.parse(item.createdAt), "dd.MM.yyyy")}
          </Text>
          <Text>{item.text}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={viewRepo} style={styles.regularButton}>
          <Text color="white" fontWeight="bold" style={{ textAlign: "center" }}>
            View repository
          </Text>
        </Pressable>
        <Pressable
          onPress={deleteAlert}
          style={[
            styles.regularButton,
            { backgroundColor: theme.colors.error },
          ]}
        >
          <Text color="white" fontWeight="bold" style={{ textAlign: "center" }}>
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviewsContainer = ({ reviews, refetch }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <View style={styles.flexContainer}>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem item={item} refetch={refetch} />}
      />
    </View>
  );
};

const MyReviews = () => {
  const { reviews, refetch } = useUserReviews({
    includeReviews: true,
  });

  if (!reviews) {
    return <Text>loading</Text>;
  }

  return <MyReviewsContainer reviews={reviews} refetch={refetch} />;
};

export default MyReviews;
