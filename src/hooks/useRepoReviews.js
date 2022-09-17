import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/queries";

const useRepoReviews = (id) => {
  const [reviews, setReviews] = useState(null);
  const { data, loading } = useQuery(GET_REVIEWS, {
    variables: { repositoryId: id },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    let dataFetched = null;

    if (data) {
      dataFetched = data.repository.reviews;
    }
    setReviews(dataFetched);
  }, [data]);

  return { reviews, loading };
};

export default useRepoReviews;
