// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNCipqJzItbQrpRMFkRt3jA9wspAyKXWg",
  authDomain: "gt-it-restaurant.firebaseapp.com",
  projectId: "gt-it-restaurant",
  storageBucket: "gt-it-restaurant.appspot.com", // Corrected domain
  messagingSenderId: "677859409011",
  appId: "1:677859409011:web:a748d4e245c42c2cc53e06",
  measurementId: "G-97CMTCB7WZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ Initialize Firestore
const analytics = getAnalytics(app);

export { db, analytics }; // ✅ Export db for use in other files
