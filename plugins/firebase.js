import firebase from 'firebase/app'
let firebaseConfig = {
  apiKey: process.env.API_KEY,
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

