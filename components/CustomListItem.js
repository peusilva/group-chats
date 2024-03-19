import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";
import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [firstMessage, setFirstMessage] = useState({});

  useEffect(() => {
    const q = query(
      collection(db, "chats", id, "messages"),
      orderBy("timestamp", "desc"),
      limit(1)
    );
    onSnapshot(q, (snapshot) => {
      setFirstMessage({
        message: snapshot.docs[0].data().message,
        displayName: snapshot.docs[0].data().displayName,
        photoURL: snapshot.docs[0].data().photoURL,
      });
    });
  }, []);
  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)}>
      <Avatar rounded source={{ uri: firstMessage.photoURL }} />
      <ListItem.Content>
        <ListItem.Title>{chatName}</ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: "gray" }}
        >
          {firstMessage.displayName === auth.currentUser.displayName
            ? `You: ${firstMessage.message}`
            : `${firstMessage.displayName}: ${firstMessage.message}`}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
