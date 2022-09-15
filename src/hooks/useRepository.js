import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPO } from "../graphql/queries";

const useRepository = (id) => {
  const [repoItem, setRepoItem] = useState(null);
  const { data, loading } = useQuery(GET_SINGLE_REPO, {
    variables: { repositoryId: id },
    // fetchPolicy: "cache-and-network",
  });

  const fetchRepoData = () => {
    let dataFetched = null;
    if (!loading && data) {
      dataFetched = data.repository;
    }
    setRepoItem(dataFetched);
  };

  useEffect(() => {
    fetchRepoData();
  }, [data]);

  return { repoItem, loading, refetch: fetchRepoData };
};

export default useRepository;
