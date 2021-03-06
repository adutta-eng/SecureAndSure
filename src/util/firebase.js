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

export async function signUp(email, password, keys) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    var uid = firebase.auth().currentUser.uid;
  
    await secureBase.ref('/Users/' + uid).set(keys); 
}

export async function signIn(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function addDocument({type, image, parsedInfo}) {
  var uid = firebase.auth().currentUser.uid;

  var docRef = secureBase.ref('/Users/' + uid + '/Documents/').push();
  await docRef.set({
    type,
    image,
    parsedInfo,
  })
}

export function onAddDocument(callback) {
  var uid = firebase.auth().currentUser.uid;
  secureBase.ref('/Users/' + uid + '/Documents/').on('value', (snapshot) => {
    const keys = [];
    snapshot.forEach((childShapShot) => keys.push(childShapShot.key))
    callback(snapshot.val(), keys)
  })
}

export function deleteDocument(key) {
  var uid = firebase.auth().currentUser.uid;
  secureBase.ref('/Users/' + uid + '/Documents/').child(key).remove();
}

export async function signOut() {
  await firebase.auth().signOut();
}

export function onUserChange(callback) {
  firebase.auth().onAuthStateChanged(user => callback(user));
}

export async function getPublicKey() {
  const uid = firebase.auth().currentUser.uid;
  return firebase.database().ref(`/Users/${uid}/publicKey`).once('value').then(snapshot => snapshot.val())
}

export async function getEncryptedPrivateKey() {
  const uid = firebase.auth().currentUser.uid;
  return firebase.database().ref(`/Users/${uid}/encryptedPrivateKey`).once('value').then(snapshot => snapshot.val())
}