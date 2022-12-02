import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/images/logo.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { myColors } from "../../../colors";

import { useFonts, Rubik_800ExtraBold } from "@expo-google-fonts/rubik";

const onSignInPressed = () => {
  console.warn("Sign in");
};

const onForgotPasswordPressed = () => {
  console.warn("Forgot Password");
};

const SignIn = () => {
  // const [fontsLoaded] = useFonts({
  //   rrr: Rubik_800ExtraBold,
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }
  const navigation = useNavigation();

  const onSingUpPressed = () => {
    console.warn("Sign up");
    navigation.navigate("SignUp");
  };

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { width, height } = useWindowDimensions();
  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, { height: height * 0.2 }]} />
      <View style={styles.container}>
        <CustomInput placeholder="Email" value={Email} setValue={setEmail} />
        <CustomInput
          placeholder="Password"
          value={Password}
          setValue={setPassword}
        />
        <CustomButton onPress={onSignInPressed} text="Sign In" />
        <Text style={styles.forgot} onPress={onForgotPasswordPressed}>
          Forgot Password ?
        </Text>
      </View>
      <SocialSignInButtons />
      <Text style={styles.forgot} onPress={onSingUpPressed}>
        Don't have an account? Create one
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
  logo: {
    width: "40%",
    maxWidth: 300,
    maxHeight: 200,
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
  forgot: {
    // fontFamily: "Rubik-Regular",
    fontWeight: "bold",
    paddingVertical: 10,
    fontSize: 15,
    color: "white",
    width: "100%",
    textAlign: "center",
    textDecorationLine: "underline",
    // textDecorationColor: "white",
  },
});

export default SignIn;
