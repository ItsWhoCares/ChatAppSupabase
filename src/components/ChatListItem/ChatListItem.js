import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { myColors } from "../../../colors";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { onUpdateChatRoom } from "../../graphql/subscriptions";
dayjs.extend(relativeTime);

const ChatListItem = ({ chat, onPress }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [chatRoom, setChatRoom] = useState(chat);
  useEffect(() => {
    const fetchUser = async () => {
      // console.log("yeyeyeye");
      const authUser = await Auth.currentAuthenticatedUser();
      const userItem = chatRoom.users.items.find(
        (item) => item?.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };
    fetchUser();

    // Subscribe to onUpdateChatRoom
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, {
        filter: { id: { eq: chat.id } },
      })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((cr) => ({
          ...(cr || {}),
          ...value.data.onUpdateChatRoom,
        }));
      },
      error: (error) => console.warn(error),
    });

    // Stop receiving data updates from the subscription
    return () => subscription.unsubscribe();
  }, [chat.id]);

  // useEffect(() => {
  //   const subscription = API.graphql(graphqlOperation(onUpdateChatRoom), {
  //     filter: { id: { eq: chat.id } },
  //   }).subscribe({
  //     next: ({ value }) => {
  //       setChatRoom((cr) => ({
  //         ...(cr || {}),
  //         ...value.data.onUpdateChatRoom,
  //       }));
  //     },
  //     error: (error) => console.warn(error),
  //   });
  //   console.log("yeyeyeye");
  //   return () => subscription.unsubscribe();
  // }, [chat.id]);
  // const chat = props.chat;
  //   console.log(chat);

  //check for not Auth user
  if (!chatRoom.LastMessage) {
    return null;
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate("ChatRoom", {
          id: chatRoom.id,
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
          {chatRoom.LastMessage && (
            <Text numberOfLines={2} style={styles.subTitle}>
              {dayjs(chatRoom.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )}
        </View>

        <Text style={styles.subTitle}>{chatRoom.LastMessage?.text}</Text>
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
