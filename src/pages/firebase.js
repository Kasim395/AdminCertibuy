import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {



    apiKey: "AIzaSyAAWEQfUoQxs9aQheIlVCWAOepkS1L0pQk",
  
  authDomain: "justtesting-ad671.firebaseapp.com",

  projectId: "justtesting-ad671",

  storageBucket: "justtesting-ad671.appspot.com",

  messagingSenderId: "998134413366",

  appId: "1:998134413366:web:b5970d82e8027e57894097"

  
  };
  
/*





    apiKey: "AIzaSyAAWEQfUoQxs9aQheIlVCWAOepkS1L0pQk",
  
  authDomain: "justtesting-ad671.firebaseapp.com",

  projectId: "justtesting-ad671",

  storageBucket: "justtesting-ad671.appspot.com",

  messagingSenderId: "998134413366",

  appId: "1:998134413366:web:b5970d82e8027e57894097"


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