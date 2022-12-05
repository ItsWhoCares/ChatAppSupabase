import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/images/WhoCares.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { Amplify, Auth } from "aws-amplify";
import { useRoute } from "@react-navigation/native";

import { myColors } from "../../../colors";

import { useFonts, Rubik_800ExtraBold } from "@expo-google-fonts/rubik";

const SignIn = () => {
  const route = useRoute();
  // const [fontsLoaded] = useFonts({
  //   rrr: Rubik_800ExtraBold,
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: route?.params?.email,
    },
  });
  const navigation = useNavigation();

  const onSignInPressed = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await Auth.signIn(data.email.trim(), data.password);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Oops", error.message);
    } finally {
      setLoading(false);
    }
    // console.log(data);
    // console.warn("Sign in");
  };
  const onSingUpPressed = () => {
    console.warn("Sign up");
    navigation.navigate("SignUp");
  };
  const onForgotPasswordPressed = () => {
    navigation.navigate("ResetPassword");
  };

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { width, height } = useWindowDimensions();
  return (
    <View style={[styles.root, { height: height * 0.2 }]}>
      <Text style={styles.logoText}>WhoCares!</Text>
      <View style={styles.container}>
        <CustomInput
          autoFocus={true}
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
          secure={true}
        />
        <CustomButton
          onPress={handleSubmit(onSignInPressed)}
          text={loading ? "Loading..." : "Sign In"}
        />
        <Text style={styles.forgot} onPress={onForgotPasswordPressed}>
          Forgot Password ?
        </Text>
      </View>
      <SocialSignInButtons />
      <Text style={styles.forgot} onPress={onSingUpPressed}>
        Don't have an account?{" "}
        <Text style={{ color: myColors.primaryBtn }}>Sign Up</Text>
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
    width: "100%",
    maxWidth: 300,
    maxHeight: 200,
  },
  logoText: {
    paddingVertical: 20,
    color: "white",
    fontSize: 56,
    // fontWeight: "bold",
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
    // textDecorationLine: "underline",
    // textDecorationColor: "white",
  },
});

export default SignIn;
