// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm_D19dgMRr4n_fX61REdMKJBuL0RC8Zc",
  authDomain: "pokus-70a48.firebaseapp.com",
  projectId: "pokus-70a48",
  storageBucket: "pokus-70a48.appspot.com",
  messagingSenderId: "785357521322",
  appId: "1:785357521322:web:0be55167edfc76c161abd3",
  measurementId: "G-420SF6XZEZ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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