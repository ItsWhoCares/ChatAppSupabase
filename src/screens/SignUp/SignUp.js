import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton";
import { myColors } from "../../../colors";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";

const onTermsPressed = () => {
  console.warn("Terms");
};
const onPrivacyPressed = () => {
  console.warn("Privacy");
};

const SignUp = () => {
  const navigation = useNavigation();
  const onSignInPressed = () => {
    console.warn("Sign in");
    navigation.navigate("SignIn");
  };
  const onRegisterPressed = () => {
    console.warn("Sign up");
    navigation.navigate("ConfirmEmail");
  };

  const { width, height } = useWindowDimensions();
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Create an account</Text>
      <View style={styles.container}>
        <CustomInput
          placeholder="Username"
          value={Username}
          setValue={setUsername}
        />
        <CustomInput placeholder="Email" value={Email} setValue={setEmail} />
        <CustomInput
          placeholder="Password"
          value={Password}
          setValue={setPassword}
        />
        <CustomInput
          placeholder="Confirm Password"
          value={ConfirmPassword}
          setValue={setConfirmPassword}
        />
        <CustomButton onPress={onRegisterPressed} text="Register" />
        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={{ color: "white" }} onPress={onTermsPressed}>
            Terms of use
          </Text>{" "}
          and{" "}
          <Text style={{ color: "white" }} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>
      </View>
      <SocialSignInButtons />
      <Text style={styles.link} onPress={onSignInPressed}>
        Already have an account? Sign In
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: myColors.pbgc,
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
    padding: 20,
    backgroundColor: myColors.sbgc,
  },
  link: {
    fontWeight: "bold",
    paddingVertical: 10,
    fontSize: 15,
    color: "white",
    width: "100%",
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    margin: 10,
  },
  text: {
    color: "#707271",
    fontSize: 12,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default SignUp;
