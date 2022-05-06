// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJzSwNoyp6CGlEEhwEeZqgyfEEwx9sysQ",
  authDomain: "perekmesimaapp.firebaseapp.com",
  projectId: "perekmesimaapp",
  storageBucket: "perekmesimaapp.appspot.com",
  messagingSenderId: "1031625487663",
  appId: "1:1031625487663:web:4e497f65902921d9551dda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);