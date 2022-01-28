import React, { useState, useContext } from "react";
import {
  TextInput,
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";

import {SafeAreaView} from "react-native-safe-area-context";
import { AuthContext } from "../firebase/AuthProvider";

let styles = {};
export default function Login() {
  const authContext = useContext(AuthContext);
  const RegisterUser = authContext.RegisterUser;
  const SignInUser = authContext.SignInUser;
  const SignOutUser = authContext.SignOutUser;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const user = AuthContext.user;
  
  return (
    <SafeAreaView>
      <View style={styles.containerMain}>
     
           <Text style={{ fontSize: 40 }}>Log In / Sign In</Text>
        <View style={{ marginTop: 10, padding: 5 }}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(e) => setEmail(e.target.value)}
          />
        </View>

        <View style={{ marginTop: 10, padding: 5 }}>
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e.target.value)}
          />
        </View>
        <View style={{ marginTop: 10, padding: 5, borderRadius: 10 }}>
          <Button title="Register" onPress={() => RegisterUser(email, password)
} />
        </View>
        <View style={{ marginTop: 10, padding: 5, borderRadius: 10 }}>
          <Button title="Sign In" onPress={() => SignInUser(email, password)
} /></View>
<View style={{ marginTop: 10, padding: 5, borderRadius: 10 }}>
          <Button title="Sign Out" onPress={() => SignOutUser(email, password)
} /></View>
        {/* {user ? (
          <View style={{ marginTop: 10, padding: 5, borderRadius: 10 }}>
            <Button title="Sign Out" onPress={SignOutUser} />
          </View>
        ) : (
          <View style={{ marginTop: 10, padding: 5, borderRadius: 10 }}>
            <Button title="Sign In" onPress={() => SignInUser(email, password) }/>
          </View>
        )} */}
      
    </View>
    </SafeAreaView>
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


