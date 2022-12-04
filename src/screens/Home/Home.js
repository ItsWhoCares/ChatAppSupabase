import { View, Text } from "react-native";
import React from "react";
import { Auth } from "aws-amplify";

const Home = () => {
  const onSignOutPressed = () => {
    Auth.signOut();
  };
  return (
    <View style={{ flex: 1, backgroundColor: "dark" }}>
      <Text
        style={{
          fontSize: 20,

          fontWeight: "bold",
          textAlign: "center",
          margin: 10,
        }}>
        Hi PAGAL
      </Text>
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

export default Home;
