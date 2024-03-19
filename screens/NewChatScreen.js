import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Icon, Input } from "@rneui/themed";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { Button } from "@rneui/base";

const NewChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Chats",
      //   headerRight: () => (
      //     // <TouchableOpacity onPress={createNewChat} activeOpacity={0.5}>
      //     //   <Text style={{ marginRight: 20, fontSize: 17 }}>Done</Text>
      //     // </TouchableOpacity>
      //   // ),
    });
  }, []);

  const createNewChat = async () => {
    try {
      const docRef = await addDoc(collection(db, "chats"), {
        chatName: input,
        createdAt: new Date().toString(),
      }).then(() => {
        navigation.replace("Home");
      });
    } catch (error) {
      alert(error.message);
    }
  };
  console.log(input);
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter chat title"
        value={input}
        onChangeText={(e) => setInput(e)}
        onSubmitEditing={createNewChat}
        autoFocus
        leftIcon={
          <Icon
            type="font-awesome"
            name="comment"
            size={24}
            style={{ marginRight: 10 }}
          />
        }
      />
      <Button
        containerStyle={styles.button}
        buttonStyle={{ borderRadius: 0 }}
        titleStyle={{ color: "black" }}
        disabled={input.length < 3}
        type="outline"
        title="Create new Chat"
        onPress={createNewChat}
      />
    </View>
  );
};

export default NewChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 47,
    padding: 30,
    paddingTop: 50,
    backgroundColor: "white",
  },
});
