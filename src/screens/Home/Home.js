import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import ChatListItem from "../../components/ChatListItem";
import { myColors } from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import HomeHeader from "../../components/HomeHeader";
import { auth } from "../../../firebase";

import { listUserChatRooms } from "../../../supabaseQueries";
import { supabase } from "../../initSupabase";
import * as Notifications from "expo-notifications";

// First, set the handler that will cause the notification
// to show the alert

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Second, call the method

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_FETCH_TASK = "background-fetch";

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

const Home = () => {
  // 2. Register the task at some point in your app by providing the same name,
  // and some configuration options for how the background fetch should behave
  // Note: This does NOT need to be in the global scope and CAN be used in your React components!
  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 5, // 15 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }
  registerBackgroundFetchAsync();

  const navigation = useNavigation();
  const [chatRooms, setChatRooms] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [rerender, setRerender] = React.useState(false);
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
    setRerender(!rerender);
    setLoading(true);

    const chatRooms = await listUserChatRooms(auth.currentUser.uid);
    // console.log(chatRooms);

    //sort by last message created_at
    const sortedRooms = chatRooms.sort((a, b) => {
      // console.log(a);
      return (
        new Date(b.ChatRoom.LastMessage.created_at) -
        new Date(a.ChatRoom.LastMessage.created_at)
      );
    });

    // console.log(JSON.stringify(sortedRooms, null, "\t"));
    setChatRooms([]);
    setChatRooms([...sortedRooms]);
    // const userInfo = await Auth.currentAuthenticatedUser();
    // const res = await API.graphql(
    //   graphqlOperation(listMyChatRooms, { id: userInfo.attributes.sub })
    // );
    // const rooms = res?.data?.getUser?.ChatRooms?.items || [];
    // const sortedRooms = rooms.sort((a, b) => {
    //   return new Date(b.chatRoom.updatedAt) - new Date(a.chatRoom.updatedAt);
    // });
    // // console.log(sortedRooms.length);
    // setChatRooms(sortedRooms);
    // console.log(chatRooms);
    setLoading(false);
  };

  useEffect(() => {
    const subscription = supabase
      .channel("public:UserChatRoom:UserID=eq." + auth.currentUser.uid)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "UserChatRoom",
          filter: `UserID=eq.${auth.currentUser.uid}`,
        },
        (payload) => {
          console.log("newChatRoom", payload);

          fetchChatRooms();
        }
      );
    return () => {
      // console.log("left");
      supabase.removeChannel(subscription);
    };
  }, [auth.currentUser.uid]);

  //fetch chatrooms
  useEffect(() => {
    fetchChatRooms();
  }, []);

  const onSearchPressed = () => {
    navigation.navigate("Search");
  };

  // console.log(chatRooms);

  if (
    chatRooms?.length === 1 &&
    chatRooms[0]?.ChatRoom?.LastMessageID ===
      "b15f0db2-87f6-4358-874a-4297ee170240"
  ) {
    return (
      <ScrollView
        contentContainerStyle={styles.emptyChats}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchChatRooms} />
        }>
        <Text style={{ color: "white" }}>
          No chats yet 😅. Start a{" "}
          <Text
            onPress={onSearchPressed}
            style={{ textDecorationLine: "underline" }}>
            new chat.
          </Text>
        </Text>
      </ScrollView>
    );
  }

  return (
    // <ScrollView style={{ flex: 1, height: "100%" }}>
    //<ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <FlatList
        data={chatRooms}
        extraData={rerender}
        renderItem={({ item }) => <ChatListItem chat={item} />}
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
    paddingVertical: 5,

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
