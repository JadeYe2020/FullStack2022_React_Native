import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPO } from "../graphql/queries";

const useRepository = (id) => {
  const [repoItem, setRepoItem] = useState(null);
  const { data, loading } = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId: id },
  });

  const fetchRepoData = () => {
    let dataFetched = null;
    if (data) {
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
