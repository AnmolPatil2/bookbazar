import firebase from "@firebase/app";
import 'firebase/firebase-auth';
import 'firebase/firestore';
import 'firebase/storage';




// Initialize Firebase
var config = {
  apiKey: "AIzaSyAw60hbpGZppOOt0_TNcTPgNdOTvfzhNtc",
  authDomain: "startuptry1-fddd7.firebaseapp.com",
  databaseURL: "https://startuptry1-fddd7.firebaseio.com",
  projectId: "startuptry1-fddd7",
  storageBucket: "startuptry1-fddd7.appspot.com",
  messagingSenderId: "600706739987"
};
const fb = firebase.initializeApp(config);

const db = firebase.firestore();

export { fb, db };