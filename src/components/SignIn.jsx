import { useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginVertical: 8,
    padding: 16,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
  },
  signInButton: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
    textAlign: "center",
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.inputBox}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={styles.inputBox}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Pressable
        onPress={onSubmit}
        style={[styles.inputBox, styles.signInButton]}
      >
        <Text
          color="white"
          fontSize="subheading"
          fontWeight="bold"
          style={{ textAlign: "center" }}
        >
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn, result] = useSignIn();
  const [data, setData] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (result.data) {
      setData(result.data);
      setToken(result.data.authenticate.accessToken);
    }
  }, [result]);

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
