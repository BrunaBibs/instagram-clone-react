import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD9vmS0vQlVZf2Si4SBmZ8XQKLzNHPmwjg",
  authDomain: "instagram-clone-react-5e161.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-5e161.firebaseio.com",
  projectId: "instagram-clone-react-5e161",
  storageBucket: "instagram-clone-react-5e161.appspot.com",
  messagingSenderId: "230767058278",
  appId: "1:230767058278:web:8fe015ca9cfb3290833ca7",
  measurementId: "G-JQF30504NX",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
