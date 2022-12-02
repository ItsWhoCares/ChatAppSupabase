import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { myColors } from "../../../colors";
import { useFonts, Rubik_400Regular } from "@expo-google-fonts/rubik";

const CustomInput = ({ value, setValue, placeholder }) => {
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        secureTextEntry={placeholder === "Password" ? true : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: myColors.input,
    width: "100%",
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 15,
    // fontFamily: "Rubik_400Regular",
  },
});

export default CustomInput;
