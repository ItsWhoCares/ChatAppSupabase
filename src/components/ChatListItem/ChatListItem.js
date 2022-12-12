import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { myColors } from "../../../colors";
import { Auth } from "aws-amplify";
dayjs.extend(relativeTime);

const ChatListItem = ({ chat, onPress }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const userItem = chat.users.items.find(
        (item) => item.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };
    fetchUser();
  }, []);
  // const chat = props.chat;
  //   console.log(chat);

  //check for not Auth user

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate("ChatRoom", {
          id: chat.id,
          user: {
            id: user.id,
            name: user.name,
            image: user.image,
          },
        })
      }>
      <Image style={styles.image} source={{ uri: user?.image }} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {user?.name}
          </Text>
          {chat.LastMessage && (
            <Text numberOfLines={2} style={styles.subTitle}>
              {dayjs(chat.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )}
        </View>

        <Text style={styles.subTitle}>{chat.LastMessage?.text}</Text>
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
