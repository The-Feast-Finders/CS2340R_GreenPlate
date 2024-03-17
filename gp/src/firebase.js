// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHR4AHHVW3sa2Uh8PwwrR_hnyyVmZvk7M",
  authDomain: "greenplate-b266e.firebaseapp.com",
  databaseURL: "https://greenplate-b266e-default-rtdb.firebaseio.com",
  projectId: "greenplate-b266e",
  storageBucket: "greenplate-b266e.appspot.com",
  messagingSenderId: "1047973675993",
  appId: "1:1047973675993:web:28fb4516a400c60f8c0fc8",
  measurementId: "G-M96DEFHN7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();

export default app;