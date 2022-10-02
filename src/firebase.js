import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWvvnmNVbjsBFFF7WPKaGKZcoQJn6S0Kk",
  authDomain: "mysocialnetwork-2d89b.firebaseapp.com",
  databaseURL: "https://mysocialnetwork-2d89b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mysocialnetwork-2d89b",
  storageBucket: "mysocialnetwork-2d89b.appspot.com",
  messagingSenderId: "106268501870",
  appId: "1:106268501870:web:34791cf7a864d8fffdc37f",
  measurementId: "G-3PB115LXN5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
