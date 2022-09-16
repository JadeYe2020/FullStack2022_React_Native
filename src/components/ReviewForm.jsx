import { View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Formik } from "formik";
import theme from "../theme";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";

const initialValues = {
  owner: "",
  repoName: "",
  rating: "",
  review: "",
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

const FormFields = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.inputBox}
        name="owner"
        placeholder="Repository owner name"
      />
      <FormikTextInput
        style={styles.inputBox}
        name="repoName"
        placeholder="Repository name"
        secureTextEntry
      />
      <FormikTextInput
        style={styles.inputBox}
        name="rating"
        placeholder="Rating between 0 and 100"
        secureTextEntry
      />
      <FormikTextInput
        style={styles.inputBox}
        name="review"
        placeholder="Review"
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
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/", { replace: true });
    // const { username, password } = values;

    // try {
    //   await signIn({ username, password });
    //   navigate("/", { replace: true });
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      // validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <FormFields onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default ReviewForm;
