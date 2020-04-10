import firebase from 'firebase/app'
import database from 'firebase/database';
import 'firebase/auth';

console.log(firebase);


let firebaseConfig = {
  apiKey: "AIzaSyAhlmBSZPfP8o-ZkqRsIM0OdVM8c3P-0rE",
  authDomain: "sphere-of-data.firebaseapp.com",
  databaseURL: "https://sphere-of-data.firebaseio.com",
  projectId: "sphere-of-data",
  storageBucket: "sphere-of-data.appspot.com",
  messagingSenderId: "1003246336259",
  appId: "1:1003246336259:web:aff23df538bb160aba5136",
  measurementId: "G-0GJNXDX1TD"
};

// let app = null
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.database();

