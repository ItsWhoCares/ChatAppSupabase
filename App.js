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
  ScrollView,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import SignIn from "./src/screens/SignIn/SignIn";
import SignUp from "./src/screens/SignUp/SignUp";
import Input from "react-native-input-style";
import ConfirmEmail from "./src/screens/ConfirmEmail";
import Navigation from "./src/components/Navigation";
import { myColors } from "./colors";

import { useFonts } from "expo-font";
import { Rubik_800ExtraBold } from "@expo-google-fonts/rubik";

import * as NavigationBar from "expo-navigation-bar";

import { Amplify, Auth, graphqlOperation, API } from "aws-amplify";
import { getUser } from "./src/graphql/queries";
import { createUser, deleteUser } from "./src/graphql/mutations";
import awsconfig from "./src/aws-exports";

Amplify.configure(awsconfig);

const App = () => {
  // Auth.signOut();

  // const [fontsLoaded] = useFonts({
  //   rr: Rubik_800ExtraBold,
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }
  useEffect(() => {
    const syncUser = async () => {
      // get Auth user
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      // console.log(authUser);
      // query db using Auth user (sub)
      const dbUser = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes.sub })
      );

      // if dbUser doesn't exist in db, create one
      if (!dbUser.data.getUser) {
        const newUser = {
          id: authUser.attributes.sub,
          name: authUser.attributes.name,
          image: `https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/${Math.floor(
            Math.random() * 4 + 1
          )}.jpg`,
          status: "Hey, I am using WhatsApp",
        };
        await API.graphql(graphqlOperation(createUser, { input: newUser }));
        console.log("User created");
      }
    };
    syncUser();
  }, []);
  NavigationBar.setBackgroundColorAsync("black");
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: myColors.pbgc,
  },
});

export default App;
