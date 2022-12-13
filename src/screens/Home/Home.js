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
import { onUpdateChatRoom } from "../../graphql/subscriptions";
const Home = () => {
  const navigation = useNavigation();
  const [chatRooms, setChatRooms] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
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

  const fetchChatRooms = async () => {
    setLoading(true);
    const userInfo = await Auth.currentAuthenticatedUser();
    const res = await API.graphql(
      graphqlOperation(listMyChatRooms, { id: userInfo.attributes.sub })
    );
    const rooms = res?.data?.getUser?.ChatRooms?.items || [];
    const sortedRooms = rooms.sort((a, b) => {
      return new Date(b.chatRoom.updatedAt) - new Date(a.chatRoom.updatedAt);
    });
    // console.log(sortedRooms.length);
    setChatRooms(sortedRooms);
    setLoading(false);
  };

  //fetch chatrooms
  useEffect(() => {
    fetchChatRooms();
  }, []);

  const onSearchPressed = () => {
    navigation.navigate("Search");
  };

  if (chatRooms.length === 0) {
    return (
      <View style={styles.emptyChats}>
        <Text style={{ color: "white" }}>
          No chats yet 😅. Start a{" "}
          <Text
            onPress={onSearchPressed}
            style={{ textDecorationLine: "underline" }}>
            new chat.
          </Text>
        </Text>
      </View>
    );
  }

  return (
    // <ScrollView style={{ flex: 1, height: "100%" }}>
    //<ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chat={item.chatRoom} />}
        onRefresh={fetchChatRooms}
        refreshing={loading}
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
  emptyChats: {
    flex: 1,
    backgroundColor: myColors.pbgc,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
