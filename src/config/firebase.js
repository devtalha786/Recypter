// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};



// Initialize Firebase only if it hasn't been initialized already
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Check if we're on the client side before initializing Firebase services
const storage = typeof window !== 'undefined' ? getStorage(app) : null;
const db = typeof window !== 'undefined' ? getFirestore(app) : null;
const auth = typeof window !== 'undefined' ? getAuth(app) : null;

export { storage, db, auth };
