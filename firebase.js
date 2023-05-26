// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwEwvan127NaMkKavHWnxr59881_UoaoQ",
  authDomain: "twitter-clone-c321b.firebaseapp.com",
  projectId: "twitter-clone-c321b",
  storageBucket: "twitter-clone-c321b.appspot.com",
  messagingSenderId: "303614665005",
  appId: "1:303614665005:web:ef2950c00488a9d2bf33a4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };