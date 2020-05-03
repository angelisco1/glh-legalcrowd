import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBLtce8jRgnRCIMKx4IkbGWbgjqX3yjQvA",
  authDomain: "legalcrowd-b2b50.firebaseapp.com",
  databaseURL: "https://legalcrowd-b2b50.firebaseio.com",
  projectId: "legalcrowd-b2b50",
  storageBucket: "legalcrowd-b2b50.appspot.com",
  messagingSenderId: "181700966893",
  appId: "1:181700966893:web:dc667eb8627331a5148fe4",
  measurementId: "G-L52B5HCTGG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
export const storageRef = firebase.storage().ref();
// export const asuntosRef = databaseRef.child('asuntos');
// export const casosPresentadosRef = databaseRef.child('casos-presentados');
// export const usuariosRef = databaseRef.child('usuarios');