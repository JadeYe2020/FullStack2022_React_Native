import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";

const useSignIn = () => {
  const [authenticate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    authenticate({ variables: { username, password } });
  };

  // console.log("result.data", result.data);

  return [signIn, result];
};

export default useSignIn;
