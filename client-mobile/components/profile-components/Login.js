import React, { useState, useContext } from "react";
import { View, Image, Alert } from "react-native";

import { Text, TextInput, Headline, Button, TouchableRipple, useTheme } from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../firebase/AuthProvider";
import useGoogleAuthentication from "./useGoogleAuthentication"


export default function Login() {
  const authContext = useContext(AuthContext);
  const RegisterUser = authContext.RegisterUser;
  const SignInUser = authContext.SignInUser;
  const SignOutUser = authContext.SignOutUser;
  const SignInUserWithCredentials = authContext.SignInUserWithCredentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = authContext.user;

  const defaultTheme = useTheme()

  const [googleAuthLoading, authWithGoogle] = useGoogleAuthentication()

  const loginWithGoogle = async () => {
      try {
          const [credential] = await authWithGoogle()
          await SignInUserWithCredentials(credential)
          console.log("google credentials", await user)
      } catch (error) {
          console.error(error)
          Alert.alert ('Error', 'Something went wrong, please try again')
      }
  }

  return (
    <>
      <View style={{...defaultTheme},{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Headline>Log In / Sign In</Headline>
          <TextInput
            style={{width: 200, height: 50}}
            mode="outlined"
            placeholder="Email"
            value={email}
            onChangeText={(e) => setEmail(e)}
            keyboardType = "email-address"
          />
          <TextInput
            style={{width: 200, height: 50}}
            mode="outlined"
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
          />
          <Button
              style={{marginTop: 5, marginBottom: 5}}
              mode="contained"
              onPress={()=>{RegisterUser(email, password)}}
              title="Register New Account"
              accessibilityLabel="Register New Account"
              color= {defaultTheme.colors.accent}
          >
            Register
          </Button> 
          <Button
              // style={{marginTop: 5, marginBottom: 5}}
              mode="contained"
              onPress={()=>{SignInUser(email, password)}}
              title="Sign In User"
              accessibilityLabel="Sign In User"
              color= {defaultTheme.colors.accent}
          >
            Sign In
          </Button>
          <Button
            // style={{marginTop:0, marginBottom: 0}}
            onPress= {()=>{
                console.log('Google login button pressed')
                loginWithGoogle()
            }}
            title="Sign in with Google"
            accessibilityLabel="Sign in with Google"
          >
            <Image 
                source={require('../../assets/google-signin-button.png')}
                style={{width: 300, height: 40, resizeMode: 'contain'}}
            />
          </Button>
          <Button
            style={{marginTop:0, marginBottom: 5}}
            onPress= {()=>{
                console.log('Facebook login button pressed (not functional yet)')
                // loginWithFacebook()
            }}
            title="Sign in with Facebook"
            accessibilityLabel="Sign in with Facebook"
          >
            <Image 
                source={require('../../assets/facebook-signin-button.png')}
                style={{width: 175, height: 30, resizeMode: 'contain'}}
            />
          </Button>
      </View>
    </>
  )
}
