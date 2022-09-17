import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../graphql/mutations";

const useAddReview = () => {
  const [addReview, result] = useMutation(ADD_REVIEW);

  const createReview = async ({ owner, repoName, rating, review }) => {
    // call the mutate function here with the right arguments
    const response = await addReview({
      variables: {
        repositoryName: repoName,
        ownerName: owner,
        rating,
        text: review,
      },
    });

    // if (response.errors) {
    //   return response.errors;
    // }

    return response.data;
  };

  return [createReview, result];
};

export default useAddReview;
