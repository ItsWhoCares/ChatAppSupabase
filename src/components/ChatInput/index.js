import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { myColors } from "../../../colors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createMessage, updateChatRoom } from "../../graphql/mutations";

const ChatInput = ({ chatRoom }) => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (message === "") return;
    // send the message to the chat server
    console.warn(`Sending: ${message}`);

    // send the message to the backend
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      const newMessage = {
        chatroomID: chatRoom.id,
        text: message,
        userID: userInfo.attributes.sub,
      };
      const newMessageData = await API.graphql(
        graphqlOperation(createMessage, { input: newMessage })
      );

      setMessage("");

      // update the last message in the chat room

      await API.graphql(
        graphqlOperation(updateChatRoom, {
          input: {
            _version: chatRoom._version,
            id: chatRoom.id,
            chatRoomLastMessageId: newMessageData.data.createMessage.id,
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <AntDesign name="plus" size={24} color="white" />
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
