import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)}>
      <Avatar rounded source={require("../assets/userPlaceholder.png")} />
      <ListItem.Content>
        <ListItem.Title>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Conversation summary
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
