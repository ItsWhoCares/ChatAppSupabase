import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React from "react";
import { Auth } from "aws-amplify";
import CustomText from "../../components/CustomText";
import ChatListItem from "../../components/ChatListItem";
import { myColors } from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import chats from "../../../src/data/chats";

const Home = () => {
  const navigation = useNavigation();
  const onSignOutPressed = () => {
    Auth.signOut();
  };

  const onChatPressed = (id) => {
    console.log("Chat pressed");
    navigation.navigate("ChatRoom", { id });
  };
  return (
    // <ScrollView style={{ flex: 1, height: "100%" }}>
    //<ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <ChatListItem chat={item} onPress={() => onChatPressed(item.id)} />
        )}
      />

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
