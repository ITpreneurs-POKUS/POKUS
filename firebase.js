// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKb6DuEOaKvAkxoHxYiJ3j4R4ScEcO5p0",
  authDomain: "pokus-b9a9f.firebaseapp.com",
  projectId: "pokus-b9a9f",
  storageBucket: "pokus-b9a9f.appspot.com",
  messagingSenderId: "243908892146",
  appId: "1:243908892146:web:c58853bef34e804773476b"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true, ignoreUndefinedProperties: true };
db.settings(settings);

// Enable experimentalForceLongPolling for Firestore
const firestoreConfig = {
  experimentalForceLongPolling: true,
};
const firestore = firebase.firestore(firebase.app());
firestore.settings(firestoreConfig);

export { firebase, db };