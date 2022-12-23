import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import Message from "../../components/Message";
import ChatInput from "../../components/ChatInput";
import messages from "../../../src/data/messages";
import { myColors } from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/CustomHeader";
// import { Auth, API, graphqlOperation } from "aws-amplify";
// import { getChatRoom, listMessagesByChatRoom } from "../../graphql/queries";
import { onCreateMessage } from "../../graphql/subscriptions";
import { set } from "react-hook-form";

import { auth } from "../../../firebase";
import { supabase } from "../../initSupabase";
import {
  getChatRoomByID,
  listMessagesByChatRoom,
} from "../../../supabaseQueries";

const ChatRoom = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [chatRoom, setChatRoom] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setAuthUser(auth.currentUser);
    // Auth.currentAuthenticatedUser().then((user) => setAuthUser(user));
    // console.log(authUser?.attributes?.sub);
  }, [chatRoom]);

  const otherUser = route.params?.user;
  const chatRoomId = route.params?.id;

  useEffect(() => {
    navigation.setOptions({
      title: otherUser.name,
      headerTitleAlign: "left",
      headerTitleStyle: {
        color: "white",
      },
      headerStyle: {
        backgroundColor: myColors.pbgc,
        // marginLeft: 10,
      },
      // headerBackImageSource: user.image,
      headerLeft: () => <CustomHeader image={otherUser?.image} />,
    });
  }, [otherUser.name]);
  // const msg = messages.filter((m) => m.chatId === id);

  //chat room info
  useEffect(() => {
    getChatRoomByID(chatRoomId).then((result) => setChatRoom(result));
    // console.log(chatRoom);

    // API.graphql(graphqlOperation(getChatRoom, { id: chatRoomId })).then(
    //   (result) => setChatRoom(result.data?.getChatRoom)
    // );
  }, [chatRoomId]);

  //fetch messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const messagesData = await listMessagesByChatRoom(chatRoomId);
      setMessages(messagesData);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMessages();
    //subscribe to new messages
    const subscription = supabase
      .channel("public:Message:ChatRoomID=eq." + chatRoomId + "")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Message",
          filter: `ChatRoomID=eq.${chatRoomId}`,
        },
        (payload) => {
          console.log("Message payload", payload);
          setMessages((prevMessages) => [payload.new, ...prevMessages]);
        }
      )
      .subscribe();

    // console.log(subscription);

    return () => supabase.removeChannel(subscription);
  }, [chatRoomId]);

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const messagesData = await API.graphql(
  //         graphqlOperation(listMessagesByChatRoom, {
  //           chatroomID: chatRoomId,
  //           sortDirection: "DESC",
  //         })
  //       );
  //       setMessages(messagesData.data.listMessagesByChatRoom?.items);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchMessages();

  //   //subscribe to new messages
  //   const subscription = API.graphql(
  //     graphqlOperation(onCreateMessage, {
  //       filter: { chatroomID: { eq: chatRoomId } },
  //     })
  //   ).subscribe({
  //     next: ({ value }) => {
  //       setMessages((prevMessages) => [
  //         value.data.onCreateMessage,
  //         ...prevMessages,
  //       ]);
  //     },
  //     error: (error) => console.log(error),
  //   });

  //   return () => subscription.unsubscribe();
  // }, [chatRoomId]);

  // console.log(chatRoom);

  if (!chatRoom) {
    return (
      <View style={styles.root}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Message message={item} authUser={authUser.uid} />
        )}
        style={styles.list}
        inverted
        onRefresh={fetchMessages}
        refreshing={loading}
      />
      <View style={{ paddingTop: 10 }}>
        <ChatInput chatRoom={chatRoom} />
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
