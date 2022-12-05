import { View, Text, StyleSheet } from "react-native";
import React from "react";
import * as Font from "expo-font";

const CustomText = async (text, CustomStyles = {}) => {
  await Font.loadAsync({
    "Rubik-Regular": require("../../../assets/fonts/Rubik-Regular.ttf"),
  });
  const styles = StyleSheet.create({
    font: {
      fontFamily: "Rubik-Regular",
      fontWeight: "bold",
    },
  });
  return (
    <>
      <Text style={[styles.font, CustomStyles]}>{text.text}</Text>
    </>
  );
};

export default CustomText;
