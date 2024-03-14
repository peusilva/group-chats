// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7BBPDThia1ZvLLA2P4c7tCQPPaNf2CJw",
  authDomain: "group-chats-9fb9a.firebaseapp.com",
  projectId: "group-chats-9fb9a",
  storageBucket: "group-chats-9fb9a.appspot.com",
  messagingSenderId: "458455841528",
  appId: "1:458455841528:web:97078d27276df1581d990d",
  measurementId: "G-9X8Y90B96K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { db, auth };
