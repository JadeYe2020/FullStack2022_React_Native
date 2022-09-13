import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import useRepository from "../hooks/useRepository";

const SingleRepo = () => {
  const id = useParams().id;
  const { repoItem } = useRepository(id);

  if (!repoItem) {
    return <Text>loading</Text>;
  }

  return <RepositoryItem item={repoItem} isSingleView={true} />;
};

export default SingleRepo;
