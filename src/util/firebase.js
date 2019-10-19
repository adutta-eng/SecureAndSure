import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyBe8TjNtReBS-WVrHQ2XRW_-eGbFDedwto",
  authDomain: "andsure-f7038.firebaseapp.com",
  databaseURL: "https://andsure-f7038.firebaseio.com",
  projectId: "andsure-f7038",
  storageBucket: "andsure-f7038.appspot.com",
  messagingSenderId: "214306060802",
  appId: "1:214306060802:web:b399779aa1da6fec23051b",
  measurementId: "G-XQTRWLE4VB"
};

firebase.initializeApp(firebaseConfig);

export function signUp(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function logout(email, password) {
  return firebase.auth().signOut();
}