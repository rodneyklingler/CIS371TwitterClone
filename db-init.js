import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth"

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDxzizSFCCRa0JhKdMHDqEuQ9Q-URuog-I",
    authDomain: "cis-371-faeba.firebaseapp.com",
    databaseURL: "https://cis-371-faeba.firebaseio.com",
    projectId: "cis-371-faeba",
    storageBucket: "cis-371-faeba.appspot.com",
    messagingSenderId: "648973464692",
    appId: "1:648973464692:web:0cf6a524106f4349878d21",
    measurementId: "G-Q6MCV073JC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppDB = firebase.database();
const AppAUTH = firebase.auth(); 
export { AppDB,AppAUTH }; // Make it available to other modules