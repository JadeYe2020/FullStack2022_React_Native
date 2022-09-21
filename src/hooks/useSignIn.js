import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [authenticate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await authenticate({ variables: { username, password } });

    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
