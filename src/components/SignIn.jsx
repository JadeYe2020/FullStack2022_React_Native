import { View, Button, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

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

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
