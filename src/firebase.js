


  import firebase from "firebase";
  
  const firebaseApp= firebase.initializeApp({apiKey: "AIzaSyCzGx0bCSZFwhJjxVSpeRxm9aCUh-BEsdw",
  authDomain: "instagram-clone-one.firebaseapp.com",
  databaseURL: "https://instagram-clone-one.firebaseio.com",
  projectId: "instagram-clone-one",
  storageBucket: "instagram-clone-one.appspot.com",
  messagingSenderId: "899318828116",
  appId: "1:899318828116:web:84101e51fea306b9c231c1",
  measurementId: "G-MYMNYWMPPX"

  });

  const db= firebaseApp.firestore();
  const auth= firebase.auth();
  const storage =firebase.storage(); 

  

  export {db,auth,storage};