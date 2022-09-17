import { View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
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
  button: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
    textAlign: "center",
  },
});

const SignUpForm = ({ onSubmit }) => {
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
      <FormikTextInput
        style={styles.inputBox}
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Pressable onPress={onSubmit} style={[styles.inputBox, styles.button]}>
        <Text
          color="white"
          fontSize="subheading"
          fontWeight="bold"
          style={{ textAlign: "center" }}
        >
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .max(30, "Username length must be no longer than 30"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password length must be no shorter than 5")
    .max(50, "Password length must be no longer than 50"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "password not match")
    .required("Password confirmation is required"),
});

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [newUser] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await newUser({ username, password });
      if (data) {
        await signIn({ username, password });
        navigate("/", { replace: true });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
