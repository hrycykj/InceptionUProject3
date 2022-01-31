import React, { useState, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FirebaseContext } from "../firebase/FirebaseProvider";

export const AuthContext = React.createContext();

function AuthProvider(props) {
  const children = props.children;
  const [user, setUser] = useState(null);
  const fbContext = useContext(FirebaseContext);
  const auth = fbContext.auth;

  useEffect(() => {
      if(auth){
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged() - new User!!", user);
      setUser(user);
    });
    return unsub; // to shut down onAuthStateChanged listener
}
  }, [auth]);


  const RegisterUser = async (email, password) => {
    try{
    let userCred = await createUserWithEmailAndPassword(auth, email, password);
    if (userCred) {
      console.log("Sign up in!!", userCred.user);
    } else {
      console.log("Sign up failed!");
    }
  } catch (ex) {
    console.log("Auth failed!", ex.message);
  }
};
  
  
  const SignInUser = async (email, password) => {
    try {
      let userCred = await signInWithEmailAndPassword(auth, email, password);
      if (userCred) {
        console.log("Logged in!!", userCred.user);
      } else {
        console.log("Login failed!");
      }
    } catch (ex) {
      console.log("AUTH FAILURE!", ex.message);
    }
  };

  const SignOutUser = async () => {
    await signOut(auth);
  };
  const theValues = { user, SignInUser, SignOutUser, RegisterUser };

  return (
    <AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
