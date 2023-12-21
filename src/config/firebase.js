// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBzTp8fZwgD8X_R1ugShxdsEbkCZhMoyHI",
  authDomain: "hellofirebase-137d8.firebaseapp.com",
  projectId: "hellofirebase-137d8",
  storageBucket: "hellofirebase-137d8.appspot.com",
  messagingSenderId: "649984412747",
  appId: "1:649984412747:web:2e09fa7edc1b98700a91ce",
  measurementId: "G-3HW5RE5KVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// giving the app created as input to the auth function and storing the reference in a variable and exporting
//it to be used elsewhere

export const auth = getAuth(app);
export const googleProvider =  new GoogleAuthProvider();


