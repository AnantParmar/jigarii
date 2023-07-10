// import {getAuth} from "firebase/auth"
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
const {getAuth} = require('firebase/auth')
const {initializeApp} = require('firebase/app')
const {getFirestore} = require('firebase/firestore')
const {getStorage} = require('firebase/storage')
const firebaseConfig = {
  apiKey: "AIzaSyA4lJC_1GGZeErByoYE5WVvLHpopD7vg9s",
  authDomain: "jigarii.firebaseapp.com",
  projectId: "jigarii",
  storageBucket: "jigarii.appspot.com",
  messagingSenderId: "175260794811",
  appId: "1:175260794811:web:7d22d4639e28b559d0ce9e",
  measurementId: "G-5SXJJJQCSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();
// exports.app = app;
// exports.db = db;
// exports.auth = auth;

module.exports =  {app,db,auth,storage}