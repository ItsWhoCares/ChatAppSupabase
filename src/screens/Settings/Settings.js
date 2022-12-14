import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { myColors } from "../../../colors";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { Auth, graphqlOperation, API } from "aws-amplify";
import { getUser } from "../../graphql/queries";

const Settings = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const onSignOutPressed = () => {
    Auth.signOut();
  };

  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    const userData = await API.graphql(
      graphqlOperation(getUser, { id: userInfo.attributes.sub })
    );
    // console.log(userData.data.getUser);
    setUser(userData.data.getUser);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Settings",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: myColors.pbgc,
        color: "white",
      },
    });
  }, []);

  return (
    <View style={styles.root}>
      <Pressable style={styles.imageContainer}>
        <Image source={{ uri: user?.image }} style={styles.image} />
      </Pressable>
      <Pressable style={styles.container}>
        <FontAwesome
          style={styles.icon1}
          name="user"
          size={24}
          color={myColors.secondaryText}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Name</Text>
          <Text style={styles.subTitle}>{user?.name}</Text>
          <Text
            style={{
              color: myColors.secondaryText,
              marginTop: 10,
              fontSize: 12,
            }}>
            This is not your username or pin. This name will be visible to your
            chat contacts.
          </Text>
        </View>
        <FontAwesome5
          style={styles.icon2}
          name="pen"
          size={18}
          color={myColors.secondaryText}
        />
      </Pressable>
      <Pressable style={styles.container}>
        <Feather
          style={styles.icon1}
          name="info"
          size={24}
          color={myColors.secondaryText}
        />
        <View style={styles.content}>
          <Text style={styles.title}>About</Text>
          <Text style={styles.subTitle}>{user?.status}</Text>
        </View>
        <FontAwesome5
          style={styles.icon2}
          name="pen"
          size={18}
          color={myColors.secondaryText}
        />
      </Pressable>

      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          width: "100%",
          marginTop: "auto",
          marginVertical: 20,
        }}
        onPress={onSignOutPressed}>
        Sign Out
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: myColors.pbgc,
    flex: 1,
  },
  imageContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    borderRadius: 100,
    width: "50%",
    height: "90%",
  },
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
    // marginBottom: 20,
    // height: 130,
  },
  content: {
    flex: 1,
    height: "105%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
  },
  icon1: {
    width: "14%",
    height: 50,
    // borderRadius: 30,
    marginRight: 10,
    textAlign: "center",
  },
  icon2: {
    // paddingTop: 10,
    width: "14%",
    // height: 50,
    // borderRadius: 30,
    marginRight: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  name: {
    // fontWeight: "bold",
    fontSize: 16,
    color: myColors.secondaryText,
    flex: 1,
  },
  title: {
    color: myColors.secondaryText,
    fontSize: 14,
  },
  subTitle: {
    fontSize: 16,
    color: "white",
  },
});

export default Settings;
