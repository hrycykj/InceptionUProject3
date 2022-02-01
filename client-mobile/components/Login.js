import React, { useState, useContext } from "react";
import { TextInput, Button, StyleSheet, Text, View, TouchableOpacity, StatusBar } from "react-native";

import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../firebase/AuthProvider";



export default function Login() {
  const authContext = useContext(AuthContext);
  const RegisterUser = authContext.RegisterUser;
  const SignInUser = authContext.SignInUser;
  const SignOutUser = authContext.SignOutUser;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = authContext.user;

  return (
    <SafeAreaView>
      <StatusBar/>
      <View style={styles.containerMain}>
        <Text style={{ fontSize: 40 }}>Log In / Sign In</Text>
        <View style={{ marginTop: 10, padding: 5 }}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
        </View>
        
        <View style={{ marginTop: 10, padding: 5 }}>
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
          />
        </View>
        <View style={{ marginTop: 10, padding: 5, borderRadius: 10 }}>
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
          </TouchableOpacity>)}

          {/* {user ? { SignOutUser } : <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>} */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    // backgroundColor: 'grey',

    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  btn: {
    width: 280, 
    borderRadius: 12, 
    padding: 15,
    margin: 8,
    alignItems: "center",
    backgroundColor: "orange",
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "orange",
    accent: "teal",
  },
};