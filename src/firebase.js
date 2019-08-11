import firebase from "@firebase/app";
import 'firebase/firebase-auth';
import 'firebase/firestore';
import 'firebase/storage';




// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2ZK7dc2I1FcHVky92H2tqMiZpDj6pQLQ",
  authDomain: "bookooo.firebaseapp.com",
  databaseURL: "https://bookooo.firebaseio.com",
  projectId: "bookooo",
  storageBucket: "bookooo.appspot.com",
  messagingSenderId: "254742781543",
  appId: "1:254742781543:web:609d3fd8f547ab4f"
};
const fb = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { fb, db };