// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiEn8bdgD99NCQksTlwFeVL_pjavnkuVQ",
  authDomain: "authapp-344df.firebaseapp.com",
  projectId: "authapp-344df",
  storageBucket: "authapp-344df.appspot.com",
  messagingSenderId: "547342736165",
  appId: "1:547342736165:web:94853dd3f81441a6f718cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export{storage} 