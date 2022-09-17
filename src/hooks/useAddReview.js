import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../graphql/mutations";
// import useAuthStorage from "../hooks/useAuthStorage";

const useAddReview = () => {
  // const authStorage = useAuthStorage();
  const [addReview, result] = useMutation(ADD_REVIEW);

  const createReview = async ({ owner, repoName, rating, review }) => {
    // const user = await authStorage.getAccessToken();

    console.log("run createReview");

    // call the mutate function here with the right arguments
    const { data } = await addReview({
      variables: {
        repositoryName: repoName,
        ownerName: owner,
        rating,
        text: review,
      },
    });

    return data;
  };

  // console.log("result", result);

  return [createReview, result];
};

export default useAddReview;
