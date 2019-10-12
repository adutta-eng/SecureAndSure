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

  import * as firebase from "firebase/app"
  import "firebase/auth"
  import "firebase/database"

  firebase.initializeApp(firebaseConfig);

  function signUp(email, password) {
      let error;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(e) {
        error = e;
      });
      return error;
  }

  function signIn(email, password) {
      let error;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(e) {
        error = e;
      });
      return error;  
  }

  function signOut() {
      let error;
    firebase.auth().signOut().then(function() {
      }).catch(function(e) {
          error = e;
      });
      return error;
  }