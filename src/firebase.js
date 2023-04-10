// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATyiNSWmXXrL4gGktl-XO9scg3ocgQjh0",
  authDomain: "home-rent-1a77d.firebaseapp.com",
  projectId: "home-rent-1a77d",
  storageBucket: "home-rent-1a77d.appspot.com",
  messagingSenderId: "832855188449",
  appId: "1:832855188449:web:adc1ea134675cd8a6b68a0"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore() 