import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCXdMQ-KMhroPmtrnVzfjrKbF66e4nmjOE",
    authDomain: "inclass-7d71d.firebaseapp.com",
    databaseURL: "https://inclass-7d71d.firebaseio.com",
    projectId: "inclass-7d71d",
    storageBucket: "inclass-7d71d.appspot.com",
    messagingSenderId: "1025799980913",
    appId: "1:1025799980913:web:d6dabd8d600b376a9358d0",
    measurementId: "G-2DEBK9S23P"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const AppDB = firebase.database();
const AppAUTH = firebase.auth();
export { AppDB, AppAUTH }; // Make this name available to other modules
