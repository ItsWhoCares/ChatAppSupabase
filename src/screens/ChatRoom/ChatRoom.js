import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import Message from "../../components/Message";
import ChatInput from "../../components/ChatInput";
import messages from "../../../src/data/messages";
import { myColors } from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/CustomHeader";

const ChatRoom = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const user = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: user.name,
      headerTitleAlign: "left",
      headerTitleStyle: {
        color: "white",
      },
      headerStyle: {
        backgroundColor: myColors.pbgc,
        // marginLeft: 10,
      },
      // headerBackImageSource: user.image,
      headerLeft: () => <CustomHeader image={user.image} />,
    });
  }, [user.name]);
  // const msg = messages.filter((m) => m.chatId === id);
  return (
    <View style={styles.root}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        style={styles.list}
        inverted
      />
      <View style={{ paddingTop: 10 }}>
        <ChatInput />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: myColors.pbgc,
  },
  list: {
    paddingHorizontal: 10,
  },
});

export default ChatRoom;
