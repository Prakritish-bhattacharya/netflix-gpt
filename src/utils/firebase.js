// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbwxL-ej9fOQfkRWCb5AMkrgDx0RuN_qY",
  authDomain: "netflixgpt-2baa5.firebaseapp.com",
  projectId: "netflixgpt-2baa5",
  storageBucket: "netflixgpt-2baa5.firebasestorage.app",
  messagingSenderId: "250359687159",
  appId: "1:250359687159:web:cf53ccaf2e47b801ae30f2",
  measurementId: "G-9NW926PGH7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
