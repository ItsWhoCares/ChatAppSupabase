import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../../screens/SignIn/SignIn";
import SignUp from "../../screens/SignUp/SignUp";
import Input from "react-native-input-style";
import ConfirmEmail from "../../screens/ConfirmEmail";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
