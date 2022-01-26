import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";

const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const children = props.children;
  const [user, setUser] = useState("James");
  

  const RegisterUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((re) => {
        console.log(re);
        setUser(re.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SignInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((re) => {
        console.log(re.user);
        setUser(re.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SignOutUser = () => {
    signOut(auth)
      .then((re) => {
        console.log(re);
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const theValues = { user, SignInUser, SignOutUser, RegisterUser };
  return (
    <AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
  );
};

module.exports = { AuthContext, AuthContextProvider };

const styles = StyleSheet.create({});
