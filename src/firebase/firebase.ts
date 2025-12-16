// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzwZlkRyJYvRnFhNb4-hq9h6HwE05VQpk",
  authDomain: "jewelshop-603b2.firebaseapp.com",
  projectId: "jewelshop-603b2",
  storageBucket: "jewelshop-603b2.firebasestorage.app",
  messagingSenderId: "738114739920",
  appId: "1:738114739920:web:f8671cb8d72da9be4b48d5",
  measurementId: "G-7QY5XK0273"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };