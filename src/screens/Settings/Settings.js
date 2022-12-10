import { View, Text } from "react-native";
import React from "react";
import { Auth } from "aws-amplify";

const Settings = () => {
  const onSignOutPressed = () => {
    Auth.signOut();
  };
  return (
    <View>
      <Text
        style={{
          color: "red",
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          width: "100%",
          marginTop: "auto",
          marginVertical: 20,
        }}
        onPress={onSignOutPressed}>
        Sign Out
      </Text>
    </View>
  );
};

export default Settings;
