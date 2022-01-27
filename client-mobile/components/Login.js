import React, { useState, useContext } from "react";
import {
  TextInput,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";

import {
  SafeAreaFrameContext,
  SafeAreaView,
} from "react-native-safe-area-context";
import { AuthContext } from "../firebase/AuthContext";

let styles = {};
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Auth = useContext(AuthContext);
  const user = Auth.user;
  const RegisterUser = Auth.RegisterUser;
  const SignInUser = Auth.SignInUser;
  const SignOutUser = Auth.SignOutUser;

  return (
    <View style={styles.containerMain}>
      <SafeAreaView>
      <ImageBackground
            style={styles.img}
            source={require("../assets/ipad.jpg")}
            
          />
        <Text style={{ fontSize: 40 }}>Log In / Sign In</Text>
        <View style={{ marginTop: 10, padding: 5 }}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={{ marginTop: 10, padding: 5 }}>
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{ marginTop: 10, padding: 5, borderRadius: 10 }}>
          <Button title="Register" onPress={() => {RegisterUser(email, password)}
} />
        </View>
        {user ? (
          <View style={{ marginTop: 10, padding: 5, borderRadius: 10 }}>
            <Button title="Sign Out" onPress={SignOutUser} />
          </View>
        ) : (
          <View style={{ marginTop: 10, padding: 5, borderRadius: 10 }}>
            <Button title="Sign In" onPress={() => {SignInUser(email, password)} }/>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    // backgroundColor: 'grey',
    
    alignItems: "center",
    justifyContent: "center",
  },
  img:{
    flex: 1,
    width:"100%",
    resizeMode: 'cover'
 
  }
});

//test test
