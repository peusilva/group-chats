import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Avatar, Icon, Image } from "@rneui/themed";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    Keyboard.dismiss();
    if (input.length > 0) {
      await addDoc(collection(db, "chats", route.params.id, "messages"), {
        timestamp: serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      });
    }
    setInput("");
  };
  useEffect(() => {
    async function getMessages() {
      const messagesRef = collection(db, "chats", route.params.id, "messages");
      const q = query(messagesRef, orderBy("timestamp"));
      onSnapshot(q, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    }
    getMessages();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{ fontWeight: "bold", fontSize: 17 }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
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
  }, [navigation]);

  const scrollViewRef = useRef();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <View style={{ height: 50 }} />
            <ScrollView
              style={{
                flex: 1,
              }}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({ animated: false })
              }
            >
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={{
                    flexDirection: "row",
                    margin: 15,
                    marginTop: 5,
                    gap: 10,
                    alignItems: "center",

                    maxWidth: "75%",
                    alignSelf:
                      message.data.email === auth.currentUser.email
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Avatar rounded source={{ uri: message.data.photoURL }} />
                    {message.data.email === auth.currentUser.email ? null : (
                      <Text>{message.data.displayName}</Text>
                    )}
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      padding: 10,
                      borderRadius: 30,
                      backgroundColor:
                        message.data.email === auth.currentUser.email
                          ? "#81cdc6"
                          : "lightblue",
                    }}
                  >
                    {message.data.message}{" "}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <SafeAreaView style={styles.footer}>
              <TextInput
                placeholder="Type a message"
                style={styles.textInput}
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Image
                  source={require("../assets/icons8-send-24.png")}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
              </TouchableOpacity>
            </SafeAreaView>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    paddingLeft: 20,
    color: "black",
    fontSize: 17,
    borderRadius: 30,
  },
});
