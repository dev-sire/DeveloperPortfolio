import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup }from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAhNdaPOWt036L1wBb-_MaL_wI2DrSZmo",
  authDomain: "developer-portfolio-c1686.firebaseapp.com",
  projectId: "developer-portfolio-c1686",
  storageBucket: "developer-portfolio-c1686.appspot.com",
  messagingSenderId: "989931342369",
  appId: "1:989931342369:web:704e0fd59d3c3d38c47160"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export const signInWithGoogle = () => signInWithPopup(auth, provider);