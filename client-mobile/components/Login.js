import { auth } from "../firebase/firebase-config";
import React, { useState } from "react";
import { TextInput, Button, StyleSheet, Text, View, Image, ScrollView, Alert } from "react-native";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { SafeAreaFrameContext, SafeAreaView } from "react-native-safe-area-context";
let styles = {}
export default function Login() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const RegisterUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((re) => {
        console.log(re);
        setIsSignedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SignInUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((re) => {
        console.log(re);
        setIsSignedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SignOutUser = () => {
    signOut(auth)
      .then((re) => {
        console.log(re);
        setIsSignedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
        <SafeAreaView>
          <Text style={{fontSize: 40}}>Log In / Sign In</Text>
    <View style={{marginTop: 10, padding: 5}}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        /></View>

    <View style={{marginTop: 10, padding: 5}}> 
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        /></View>
        <View style={{marginTop: 10, padding: 5, borderRadius: 10}}>
        <Button title="Register" onPress={RegisterUser} /></View>
        {isSignedIn === true ? (
        <View style={{marginTop: 10, padding: 5, borderRadius: 10}}>  
          <Button title="Sign Out" onPress={SignOutUser} /></View>
        ) : (
        <View style={{marginTop: 10, padding: 5, borderRadius: 10}}>  
          <Button title="Sign In" onPress={SignInUser} /></View>
        )}
</SafeAreaView>
</View>
  );
}

styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'grey',
    marginTop: 300,
    alignItems: 'center',
    justifyContent: 'center',

  }
});


//test test