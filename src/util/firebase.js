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
  var secureBase = firebase.database();

  async function signUp(email, password) {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      var emailKey = secureBase.ref().child('accounts').child('emails').push().key();
      var emailUpdate = {};

      emailUpdate['/emails/' + emailKey] = email;

      await secureBase.ref().update(emailUpdate);
  }

  async function signIn(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
      var uid = firebase.auth().currentUser().uid;
      var uidKey = secureBase.ref().child('Signed In Users').child('IDs').push().key();

      var uidUpdate = {};
      uidUpdate['/IDs/' + uidKey] = uid;
      await secureBase.ref().update(uidUpdate); 
  }

  async function signOut() {
      let error;
      await firebase.auth().signOut()
      await secureBase.ref().child('Signed In Users').child('IDs').child(firebase.auth().currentUser().uid).remove();
  }