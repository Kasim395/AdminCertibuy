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
  
  
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();
 
export { firebaseConfig, db, auth };

