import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";

import { auth } from "../../../firebase";
import { supabase } from "../../initSupabase";

const CustomHeader = ({ image, online, oUser }) => {
  const navigation = useNavigation();
  const [userOnline, setUserOnline] = React.useState(undefined);
  const [otherUser, setOtherUser] = React.useState(oUser);

  React.useEffect(() => {
    // Supabase client setup

    const channel = supabase.channel("online-users", {
      config: {
        presence: {
          key: auth.currentUser.uid,
        },
      },
    });

    channel.on("presence", { event: "sync" }, async () => {
      const onlineUsers = channel.presenceState();
      // console.log("Online users: ", onlineUsers);
      setUserOnline(onlineUsers[otherUser.id] ? true : false);
      // console.log(onlineUsers[otherUser.id] ? true : false);
    });
    let inter;

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        inter = setInterval(async () => {
          const status = await channel.track({
            online_at: new Date().toISOString(),
          });
        }, 1000);
      }
    });
    return () => {
      clearInterval(inter);
      supabase.removeChannel(channel);
      // console.log("channel removed");
    };
  }, [oUser]);

  return (
    <>
      <>
        <AntDesign
          onPress={navigation.goBack}
          name="arrowleft"
          size={24}
          color="white"
        />
        <Image
          source={{ uri: image }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginLeft: 15,
            marginRight: 15,
          }}
        />
      </>
      <View style={styles.root}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          {otherUser.name}
        </Text>
        {userOnline && <Text style={styles.online}>Online</Text>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    // alignItems: "center",
    // padding: 10,
  },
  online: {
    color: "green",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default CustomHeader;
