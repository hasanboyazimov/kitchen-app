import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4EFsWZUEwgV1VGKEBIvLuTiPWs2P8yBU",
  authDomain: "kitchen-app-uzb.firebaseapp.com",
  databaseURL:
    "https://kitchen-app-uzb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kitchen-app-uzb",
  storageBucket: "kitchen-app-uzb.appspot.com",
  messagingSenderId: "418635979781",
  appId: "1:418635979781:web:0d773202ce2c6e2cbb906c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth(app);

//db
export const db = getFirestore(app);
