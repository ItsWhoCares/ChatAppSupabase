import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { getCommonChatRoom } from "../../../dbhelper";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { myColors } from "../../../colors";
dayjs.extend(relativeTime);

const SearchListItem = ({ user }) => {
  const navigation = useNavigation();
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setAuthUser(userInfo?.attributes?.sub);
    };
    fetchUser();
  }, []);

  const onPress = async () => {
    //Check if the user is already in the chat room
    if (loading) return;
    setLoading(true);
    const existingChatRoom = await getCommonChatRoom(user.id);
    if (existingChatRoom) {
      // console.log("existing");
      // console.log(existingChatRoom.chatRoom.id);

      navigation.navigate("ChatRoom", {
        id: existingChatRoom.chatRoom.id,
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
      });
      setLoading(false);
      return;
    }
    //If not, create a new chat room
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );

    // console.log(newChatRoomData);

    if (!newChatRoomData.data?.createChatRoom) {
      console.log("Failed to create a chat room");
      return;
    }

    const newChatRoom = newChatRoomData.data?.createChatRoom;
    console.log("new chat room", newChatRoom);
    //Add the user to the chat room
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: {
          chatRoomId: newChatRoom.id,
          userId: user.id,
        },
      })
    );

    //Add the authenticated user to the chat room
    const userInfo = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: {
          chatRoomId: newChatRoom.id,
          userId: userInfo.attributes.sub,
        },
      })
    );
    console.log("new");
    setLoading(false);
    // Navigate to the chat room
    navigation.navigate("ChatRoom", {
      id: newChatRoom.id,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    });
  };
  if (authUser == user.id) {
    return null;
  }

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={{ uri: user.image }} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {user.name}
          </Text>
          {user.createdAt !== undefined && (
            <Text numberOfLines={2} style={styles.subTitle}>
              {dayjs(user.createdAt).fromNow(true)}
            </Text>
          )}
        </View>

        {user.status !== undefined && (
          <Text numberOfLines={2} style={styles.subTitle}>
            {user.status}
          </Text>
        )}
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

export default SearchListItem;
