import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input, Image } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        const user = authUser.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage, errorCode);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={require("../assets/chat-bubbles.png")}
            style={{
              width: 200,
              height: 200,
              marginBottom: 48,
            }}
          />
          <View style={styles.inputContainer}>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              textContentType="oneTimeCode"
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              placeholder="Password"
              secureTextEntry
              type="password"
              value={password}
              textContentType="oneTimeCode"
              onChangeText={(text) => setPassword(text)}
              onSubmitEditing={signIn}
            />
          </View>
          <Button
            containerStyle={styles.button}
            buttonStyle={{ backgroundColor: "black", borderRadius: 0 }}
            onPress={signIn}
            title="Login"
          />
          <Button
            containerStyle={styles.button}
            buttonStyle={{ borderRadius: 0 }}
            titleStyle={{ color: "black" }}
            type="outline"
            title="Register"
            onPress={() => navigation.navigate("Register")}
          />
          <View style={{ height: 100 }} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
