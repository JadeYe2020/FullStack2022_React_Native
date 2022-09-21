import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";

const useUserReviews = (variables) => {
  const { data, loading, ...result } = useQuery(CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  return {
    reviews: data?.me.reviews,
    loading,
    ...result,
  };
};

export default useUserReviews;
