//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBHE3glBn29ITGuoUmFfcf--qZVek6UuGs",
  authDomain: "boomerang-ironhack.firebaseapp.com",
  projectId: "boomerang-ironhack",
  storageBucket: "boomerang-ironhack.appspot.com",
  messagingSenderId: "594069899644",
  appId: "1:594069899644:web:fd2f24716f96b993ebfcf9",
  //measurementId: "${config.measurementId}"
};



// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
};



export {uiConfig, app}