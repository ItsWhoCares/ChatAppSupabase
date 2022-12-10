import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import CustomText from "../../components/CustomText";
import ChatListItem from "../../components/ChatListItem";
import { myColors } from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import chats from "../../../src/data/chats";
import { AntDesign } from "@expo/vector-icons";
import HomeHeader from "../../components/HomeHeader";

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,

      title: "Chats",
      headerStyle: {
        backgroundColor: myColors.pbgc,
      },
      headerTintColor: "white",
      headerTitleAlign: "left",
      headerRight: () => <HomeHeader />,
    });
  }, []);

  return (
    // <ScrollView style={{ flex: 1, height: "100%" }}>
    //<ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatListItem chat={item} />}
      />
    </View>
    //</ScrollView>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: myColors.pbgc,
    paddingVertical: 10,

    justifyContent: "center",
    // alignItems: "center",
  },
});

export default Home;
