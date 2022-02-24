import React, { useState, useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { Text, TextInput, Headline, Button, TouchableRipple, useTheme } from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../firebase/AuthProvider";



export default function Login() {
  const authContext = useContext(AuthContext);
  const RegisterUser = authContext.RegisterUser;
  const SignInUser = authContext.SignInUser;
  const SignOutUser = authContext.SignOutUser;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = authContext.user;

  const defaultTheme = useTheme()

  return (
    // <SafeAreaView>
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
                style={{marginTop: 5, marginBottom: 5}}
                mode="contained"
                onPress={()=>{SignInUser(email, password)}}
                title="Sign In User"
                accessibilityLabel="Sign In User"
                color= {defaultTheme.colors.accent}
            >
              Sign In
            </Button> 
        </View>

        
        {/* <View style={{ marginTop: 10, padding: 5, borderRadius: 10 }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => RegisterUser(email, password)}
          >
            <Text>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => SignInUser(email, password)}
          >
            <Text>Sign In</Text>
          </TouchableOpacity>

          {user && (

          <TouchableOpacity
            style={styles.btn}
            onPress={() => SignOutUser(email, password)}
          >
            <Text>Sign Out</Text>
          </TouchableOpacity> */}

          {/* {user ? { SignOutUser } : <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>} */}
        {/* </View> */}
      </>
    // </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   containerMain: {
//     flex: 1,
//     // backgroundColor: 'grey',

//     alignItems: "center",
//     justifyContent: "center",
//   },
//   img: {
//     flex: 1,
//     width: "100%",
//     resizeMode: "cover",
//   },
//   btn: {
//     width: 280, 
//     borderRadius: 12, 
//     padding: 15,
//     margin: 8,
//     alignItems: "center",
//     backgroundColor: "orange",
//   },
// });

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: "orange",
//     accent: "teal",
//   },
// };