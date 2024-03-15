import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "@rneui/base";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
} from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImage] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  });

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            imageUrl ||
            `https://avatar.iran.liara.run/public/boy?username=${email}`,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar style="auto" />
        <Text h3 style={{ marginBottom: 50, marginTop: 50 }}>
          Create an account
        </Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Full Name"
            type="text"
            autoFocus
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Profile Picture Link (Optional)"
            type="text"
            value={imageUrl}
            onChangeText={(text) => setImage(text)}
            onSubmitEditing={register}
          />
        </View>
        <Button
          containerStyle={styles.button}
          buttonStyle={{ backgroundColor: "black", borderRadius: 0 }}
          onPress={register}
          title="Register"
          raised
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

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
