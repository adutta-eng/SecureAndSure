import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

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
  var secureBase = firebase.database();

  
  export async function signUp(email, password) {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      var authEmail = firebase.auth().currentUser.email;
      var uid = firebase.auth().currentUser.uid;

      await secureBase.ref('/Users/' + uid).set({
        key1: "Test",
      }); 

  }

  export async function signIn(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    var uid = firebase.auth().currentUser.uid;
  }

  export async function updateDatabaseWithUpload(b64, parsedInfo) {
    var uid = firebase.auth().currentUser.uid;

    var docRef = secureBase.ref('/Users/' + uid + '/Documents/').push();
    await docRef.set({
      "image": b64,
      parsedInfo,
    })
  }

  export function onAddDocument(callback) {
    var uid = firebase.auth().currentUser.uid;
    secureBase.ref('/Users/' + uid + '/Documents/').on('value', (snapshot ) => callback(snapshot.val()))
  }

  export async function signOut() {
      let error;
      await firebase.auth().signOut();
  }