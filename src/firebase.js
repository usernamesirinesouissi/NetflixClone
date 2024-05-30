// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

import { toast } from 'react-toastify';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkg59bpFzzFZMyjH7Wcuq9UzM6ilVM8kY",
  authDomain: "netflix-669a3.firebaseapp.com",
  projectId: "netflix-669a3",
  storageBucket: "netflix-669a3.appspot.com",
  messagingSenderId: "889860878055",
  appId: "1:889860878055:web:d580a495c92c5f0e38bc42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(doc(collection(db, "user")), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    // Sign in user with email and password
   await signInWithEmailAndPassword(
      auth,
      email,
      password
    ); 
   
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = () => {
    signOut(auth);
};
export { auth,db, login, signup, logout };
