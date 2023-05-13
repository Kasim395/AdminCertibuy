import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {


  apiKey: "AIzaSyDf2KbwXCvt8XcRH7LABMxLz-0P5eJEObM",

  authDomain: "certifiedbuybackend.firebaseapp.com",

  projectId: "certifiedbuybackend",

  storageBucket: "certifiedbuybackend.appspot.com",

  messagingSenderId: "812176911123",

  appId: "1:812176911123:web:90da56c04fd2b6c10148e6",

  measurementId: "G-HX2QDNCX2P"









  


  
  };
  
/*

apiKey: "AIzaSyDf2KbwXCvt8XcRH7LABMxLz-0P5eJEObM",

  authDomain: "certifiedbuybackend.firebaseapp.com",

  projectId: "certifiedbuybackend",

  storageBucket: "certifiedbuybackend.appspot.com",

  messagingSenderId: "812176911123",

  appId: "1:812176911123:web:90da56c04fd2b6c10148e6",

  measurementId: "G-HX2QDNCX2P"









    apiKey: "AIzaSyANG7fm44lR4tnk1C8dtAuPIMzklv5g31o",

    authDomain: "fa19-bse-class.firebaseapp.com",

    projectId: "fa19-bse-class",

    storageBucket: "fa19-bse-class.appspot.com",

    messagingSenderId: "361672873878",

    appId: "1:361672873878:web:fad51460a910606046afb7"



 
*/

  
  
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth } 