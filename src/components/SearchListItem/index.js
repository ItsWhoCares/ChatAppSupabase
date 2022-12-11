import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { myColors } from "../../../colors";
dayjs.extend(relativeTime);

const SearchListItem = ({ user }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate("ChatRoom", {
          id: user.id,
          name: user.name,
          image: user.image,
        })
      }>
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
