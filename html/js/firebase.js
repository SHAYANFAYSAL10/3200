// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaBdgL6X4lTmISh5dJWXUtC9Vbdov7sfE",
  authDomain: "ecom-website-1e64a.firebaseapp.com",
  projectId: "ecom-website-1e64a",
  storageBucket: "ecom-website-1e64a.appspot.com",
  messagingSenderId: "1077545942906",
  appId: "1:1077545942906:web:db3f8b9e4895e62174a0c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);