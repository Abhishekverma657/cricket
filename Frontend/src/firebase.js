import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgfM-u_9aYGY80KX73GNyCSDC9lUbdZ-E",
  authDomain: "cricket-dfcd2.firebaseapp.com",
  projectId: "cricket-dfcd2",
  storageBucket: "cricket-dfcd2.firebasestorage.app",
  messagingSenderId: "591926051230",
  appId: "1:591926051230:web:3729911225d4bf89dbd68f",
  measurementId: "G-5KC9DKQ5DD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
export const db = getFirestore(app);
