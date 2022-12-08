import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import Message from "../../components/Message";
import messages from "../../../src/data/messages";
import { myColors } from "../../../colors";
const ChatRoom = () => {
  const route = useRoute();
  return (
    <View style={styles.root}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: myColors.pbgc,
  },
  list: {
    padding: 10,
  },
});

export default ChatRoom;
