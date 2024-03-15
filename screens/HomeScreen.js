import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    async function getChats() {
      const querySnapshot = await getDocs(collection(db, "chats"));
      setChats([]);
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        setChats((prevChats) => [...prevChats, { id: doc.id, ...docData }]);
      });
    }
    getChats();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 5 }}>
          <TouchableOpacity
            onPress={logOut}
            activeOpacity={0.5}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
            <Text>Log out</Text>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("NewChat")}
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  });
  const logOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView styleContainer={styles.chatsContainer}>
        {chats.map(({ id, chatName, createdAt }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            createdAt={createdAt}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: 45,
  },
  chatsContainer: {
    flex: 1,
    height: "100%",
  },
  button: {
    width: 200,
  },
});
