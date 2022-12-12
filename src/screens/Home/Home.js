import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import CustomText from "../../components/CustomText";
import ChatListItem from "../../components/ChatListItem";
import { myColors } from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import chats from "../../../src/data/chats";
import { AntDesign } from "@expo/vector-icons";
import HomeHeader from "../../components/HomeHeader";
import { listMyChatRooms } from "../../../dbhelper";

const Home = () => {
  const navigation = useNavigation();
  const [chatRooms, setChatRooms] = React.useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,

      title: "Chats",
      headerStyle: {
        backgroundColor: myColors.pbgc,
      },
      headerTintColor: "white",
      headerTitleAlign: "left",
      headerRight: () => <HomeHeader />,
    });
  }, []);

  //fetch chatrooms
  useEffect(() => {
    try {
      const fetchChatRooms = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
        const res = await API.graphql(
          graphqlOperation(listMyChatRooms, { id: userInfo.attributes.sub })
        );
        const rooms = res?.data?.getUser?.ChatRooms?.items || [];
        const sortedRooms = rooms.sort((a, b) => {
          return (
            new Date(b.chatRoom.updatedAt) - new Date(a.chatRoom.updatedAt)
          );
        });
        console.log(sortedRooms);
        setChatRooms(sortedRooms);
        // console.log(chatRooms);
      };
      fetchChatRooms();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    // <ScrollView style={{ flex: 1, height: "100%" }}>
    //<ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chat={item.chatRoom} />}
      />
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
