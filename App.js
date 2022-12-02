// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  SafeAreaView,
  TouchableNativeFeedback,
  Button,
  Platform,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useState, useCallback } from "react";
import SignIn from "./src/screens/SignIn/SignIn";
import SignUp from "./src/screens/SignUp/SignUp";
import Input from "react-native-input-style";
import ConfirmEmail from "./src/screens/ConfirmEmail";
import Navigation from "./src/components/Navigation";
import { myColors } from "./colors";

import { useFonts } from "expo-font";
import { Rubik_800ExtraBold } from "@expo-google-fonts/rubik";

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   rr: Rubik_800ExtraBold,
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor={"#30475e"} style="auto" />
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: myColors.pbgc,
  },
});
