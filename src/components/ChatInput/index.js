import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { myColors } from "../../../colors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
// import { createMessage, updateChatRoom } from "../../graphql/mutations";

import { auth } from "../../../firebase";
import {
  createMessage,
  updateChatRoomLastMessage,
  getCommonChatRoom,
} from "../../../supabaseQueries";

const ChatInput = ({ chatRoom, otherUser }) => {
  const [message, setMessage] = useState("");
  // const [otherUser, setOtherUser] = useState(OtherUser);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (loading) return;
    setLoading(true);
    if (message === "") return;
    // send the message to the chat server
    // console.warn(`Sending: ${message}`);

    // send the message to the backend
    const newMessageData = await createMessage({
      ChatRoomID: chatRoom.id,
      text: message,
      UserID: auth.currentUser.uid,
    });
    // console.log("New Message", newMessageData);
    setMessage("");

    //Update the last message in the chat room
    const res = await updateChatRoomLastMessage({
      ChatRoomID: chatRoom.id,
      LastMessageID: newMessageData.id,
    });
    // console.log("Last message updated", res);

    // try {
    //   const userInfo = await Auth.currentAuthenticatedUser();
    //   const newMessage = {
    //     chatroomID: chatRoom.id,
    //     text: message,
    //     userID: userInfo.attributes.sub,
    //   };
    //   const newMessageData = await API.graphql(
    //     graphqlOperation(createMessage, { input: newMessage })
    //   );

    //   setMessage("");

    //   // update the last message in the chat room

    //   await API.graphql(
    //     graphqlOperation(updateChatRoom, {
    //       input: {
    //         _version: chatRoom._version,
    //         id: chatRoom.id,
    //         chatRoomLastMessageId: newMessageData.data.createMessage.id,
    //       },
    //     })
    //   );
    // } catch (e) {
    //   console.log(e);
    // }
    setLoading(false);
    // console.log("otherUser", otherUser);
    const nf = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: '{"to": "ExponentPushToken[KBqO4ID4i4FW6nA3vpdgt4]","title":"hello","body": "world"}',
      body: JSON.stringify({
        to: "ExponentPushToken[KBqO4ID4i4FW6nA3vpdgt4]",
        title: otherUser.name,
        body: message,
      }),
    });
    console.log(JSON.stringify(nf, null, "\t"));
  };

  const tempp = async () => {
    console.log("tempp");
    const res = await getCommonChatRoom({
      authUserID: "usOWdwZr9XeOwdkIyjbJixXDmC12",
      otherUserID: "JK2Ww9wLsuTXgFVwj9U6BCxUw704",
    });
  };

  return (
    <View style={styles.inputContainer}>
      <AntDesign name="plus" size={24} color="white" onPress={tempp} />
      <TextInput
        value={message}
        onChangeText={(text) => setMessage(text)}
        placeholder="Message..."
        placeholderTextColor={"gray"}
        style={styles.input}
      />
      <MaterialIcons
        onPress={handleSend}
        name="send"
        size={24}
        color="royalblue"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    backgroundColor: myColors.SecondaryMessage,
    borderRadius: 25,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 15,
    // marginVertical: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: myColors.SecondaryMessage,
    borderColor: myColors.SecondaryMessage,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 8,
    borderRadius: 20,
    color: "white",
  },
  button: {
    width: 80,
  },
});

export default ChatInput;
