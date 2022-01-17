import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert, View, Button } from 'react-native';
import {Auth} from './firebase/firebase-config';
import { HOST_SERVER } from './util';
import React, {useState} from 'react';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';

const App =() => {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <View>
      <TextInput placeholder='Username' />
      <TextInput placeholder='Password' />
      <Button title='Sign In' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;