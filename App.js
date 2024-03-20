import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import NewChatScreen from "./screens/NewChatScreen";
import ChatScreen from "./screens/ChatScreen";

const Stack = createNativeStackNavigator();

const GlobalScreenOptions = {
  headerTransparent: true,
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "#000000",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerTitle: "",
  headerTitleStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerShadowVisible: false,
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={GlobalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewChat" component={NewChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
