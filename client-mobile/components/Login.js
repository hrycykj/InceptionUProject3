import { auth } from "../firebase/firebase-config";
import React, { useState } from "react";
import { TextInput, Button, StyleSheet, Text, View, Image, ScrollView, Alert } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { SafeAreaFrameContext, SafeAreaView } from "react-native-safe-area-context";

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
    <View>
        <SafeAreaView>
<Text style={{fontSize: 40}}>Log In / Sign In</Text>
     
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />


        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Register" onPress={RegisterUser} />
        {isSignedIn === true ? (
          <Button title="Sign Out" onPress={SignOutUser} />
        ) : (
          <Button title="Sign In" onPress={SignInUser} />
        )}
</SafeAreaView>
  </View>
  );
}


//test test