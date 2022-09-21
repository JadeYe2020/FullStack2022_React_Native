import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [deleteReview, result] = useMutation(DELETE_REVIEW);

  const removeReview = async (id) => {
    const response = await deleteReview({
      variables: { deleteReviewId: id },
    });

    return response.data.deleteReview;
  };

  return [removeReview, result];
};

export default useDeleteReview;
