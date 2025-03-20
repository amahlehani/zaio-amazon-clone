import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "clone-2ce54.firebaseapp.com",
    projectId: "clone-2ce54",
    storageBucket: "clone-2ce54.firebasestorage.app",
    messagingSenderId: "436534612732",
    appId: "1:436534612732:web:0bc1046b4b7ca8bd543d79",
    measurementId: "G-X5FP0KM787"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const auth = getAuth(app);

  export { db, auth };