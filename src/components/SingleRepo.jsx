import Text from "./Text";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";

const SingleRepo = () => {
  const id = useParams().id;
  console.log("id", id);
  return <Text>id:{id}</Text>;

  // return <RepositoryItem item={item} />;
};

export default SingleRepo;
