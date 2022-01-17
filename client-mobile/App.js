
import {auth} from './firebase/firebase-config';
import React, {useState} from 'react';
import {TextInput, Button, StyleSheet, Text, View } from 'react-native';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, SignOut } from "firebase/auth";


const App =() => {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
const RegisterUser =()=>{
    createUserWithEmailAndPassword(auth, email, password)
  .then((re) => {
    console.log(re);
    setIsSignedIn(true)
  })
  .catch((re) => {
  console.log(err);
  })


const SignInUser =()=>{
      signInWithEmailAndPassword(auth, email, password)
    .then((re) => {
    console.log(re);
    setIsSignedIn(true);
    })
    .catch((re) => {
    console.log(err);
    })

const SignOutUser =()=>{
      signOut(auth)
      .then((re) => {
        console.log(re);
        setIsSignedIn(false);
      })
      .catch((err) => {
      console.log(err);
    })


  return (
    <View>
      <TextInput placeholder='Email' value={email} onChangeText={text=>setEmail(text)}/>
      <TextInput placeholder='Password' value={password} secureTextEntry={true} onChangeText={text=>setPassword(text)}/>
      <Button title='Register' onPress={RegisterUser} />
      {isSignedIn === true?
      <Button title='Sign Out' onPress={SignOutUser} />
      :
      <Button title='Sign In' onPress={SignInUser} />      
      }
    </View>
  );
}


export default App;