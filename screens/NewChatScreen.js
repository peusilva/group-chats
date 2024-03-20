import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Icon, Image, Input } from "@rneui/themed";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { Button } from "@rneui/base";

const NewChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Chats",
      headerLeft: () => (
        <View style={{ marginLeft: 5 }}>
          <TouchableOpacity
            onPress={navigation.goBack}
            activeOpacity={0.5}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Image
              source={require("../assets/icons8-back-24.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text>Chats</Text>
          </TouchableOpacity>
        </View>
      ),
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
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter chat title"
        value={input}
        onChangeText={(e) => setInput(e)}
        onSubmitEditing={createNewChat}
        autoFocus
        leftIcon={
          <Image
            source={require("../assets/icons8-chat-24.png")}
            style={{ width: 20, height: 20 }}
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
