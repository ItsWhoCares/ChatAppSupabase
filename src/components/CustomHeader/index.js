import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
const CustomHeader = ({ image }) => {
  const navigation = useNavigation();
  return (
    <>
      <AntDesign
        onPress={navigation.goBack}
        name="arrowleft"
        size={24}
        color="white"
      />
      <Image
        source={{ uri: image }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          marginLeft: 15,
          marginRight: 15,
        }}
      />
    </>
  );
};

export default CustomHeader;
