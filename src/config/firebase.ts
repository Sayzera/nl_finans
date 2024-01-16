// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChjuN1-07ARcX9yRQGScT079HJCbHyUoE",
  authDomain: "niltek-muhasebe.firebaseapp.com",
  projectId: "niltek-muhasebe",
  storageBucket: "niltek-muhasebe.appspot.com",
  messagingSenderId: "594424707807",
  appId: "1:594424707807:web:7751a5169fc93231f8076a",
  measurementId: "G-PKVX4GY0Y0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, app, auth };
