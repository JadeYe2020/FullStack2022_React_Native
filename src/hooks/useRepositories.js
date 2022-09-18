import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const [repositories, setRepositories] = useState();

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const fetchRepositories = () => {
    let dataFetched = null;

    // console.log("error", error);
    // console.log("data", data);

    if (data) {
      dataFetched = data.repositories;
      // console.log("dataFetched", dataFetched);
    }

    setRepositories(dataFetched);
  };

  useEffect(() => {
    fetchRepositories();
  }, [data]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
