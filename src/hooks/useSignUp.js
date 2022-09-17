import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";

const useSignUp = () => {
  const [signUp, result] = useMutation(SIGN_UP);

  const newUser = async ({ username, password }) => {
    const response = await signUp({ variables: { username, password } });
    return response;
  };

  return [newUser, result];
};

export default useSignUp;
