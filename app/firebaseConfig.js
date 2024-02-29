// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyADILjBm81Inhyg1C8AngrShqLZqygd-E8",
  authDomain: "shop-b0aeb.firebaseapp.com",
  projectId: "shop-b0aeb",
  storageBucket: "shop-b0aeb.appspot.com",
  messagingSenderId: "81921358277",
  appId: "1:81921358277:web:4d74728e87eff5073e73ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(app);
export const FIREBASE_AUTH = getAuth(app);