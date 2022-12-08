import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { myColors } from "../../../colors";
dayjs.extend(relativeTime);

const ChatListItem = ({ chat, onPress }) => {
  // const chat = props.chat;
  //   console.log(chat);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={{ uri: chat.user.image }} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {chat.user.name}
          </Text>
          <Text numberOfLines={2} style={styles.subTitle}>
            {dayjs(chat.lastMessage.createdAt).fromNow(true)}
          </Text>
        </View>

        <Text style={styles.subTitle}>{chat.lastMessage.text}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  content: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  name: {
    // fontWeight: "bold",
    fontSize: 16,
    color: "white",
    flex: 1,
  },
  subTitle: {
    color: myColors.secondaryText,
  },
});

export default ChatListItem;
