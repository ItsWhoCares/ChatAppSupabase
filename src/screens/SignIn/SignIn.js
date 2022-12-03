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
import { useForm, Controller } from "react-hook-form";

import { myColors } from "../../../colors";

import { useFonts, Rubik_800ExtraBold } from "@expo-google-fonts/rubik";

const SignIn = () => {
  // const [fontsLoaded] = useFonts({
  //   rrr: Rubik_800ExtraBold,
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const onSignInPressed = (data) => {
    console.log(data);
    console.warn("Sign in");
  };
  const onSingUpPressed = () => {
    console.warn("Sign up");
    navigation.navigate("SignUp");
  };
  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
  };

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { width, height } = useWindowDimensions();
  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, { height: height * 0.2 }]} />
      <View style={styles.container}>
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{ required: "Email is required" }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be minimun 6 character long",
            },
          }}
        />
        <CustomButton onPress={handleSubmit(onSignInPressed)} text="Sign In" />
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
