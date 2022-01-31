import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
export const FirebaseContext = React.createContext();

function FirebaseProvider(props) {
  const children = props.children;
  const firebaseConfig = {
    apiKey: "AIzaSyB5ESZHo5t4h97BbpW3U3RZOUBDpZtHBLo",
    authDomain: "inceptionuproject3-338004.firebaseapp.com",
    projectId: "inceptionuproject3-338004",
    storageBucket: "inceptionuproject3-338004.appspot.com",
    messagingSenderId: "578538869254",
    appId: "1:578538869254:web:5c235e1f61e639f3daa987",
    measurementId: "G-4E537BVZ8L"
  };
  
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const theValues = { app, auth, db };

  const db = getFirestore(app);

  return (
    <FirebaseContext.Provider value={theValues}>
      {children}
    </FirebaseContext.Provider>
  );
}

export default FirebaseProvider;
