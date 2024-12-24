// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3S00NdvHjneiHhjukkBsVCuz3veYzN4Q",
  authDomain: "lmsfr-f9d0f.firebaseapp.com",
  databaseURL: "https://lmsfr-f9d0f-default-rtdb.firebaseio.com",
  projectId: "lmsfr-f9d0f",
  storageBucket: "lmsfr-f9d0f.firebasestorage.app",
  messagingSenderId: "731236601879",
  appId: "1:731236601879:web:8cb4b88b62cb897c0b0c52",
  measurementId: "G-KW394DVEK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database, firebaseConfig };