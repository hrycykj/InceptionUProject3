import React, { useContext } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { AuthContext } from "./firebase/AuthProvider";
import Navigation from "./components/Navigation";
import HomeScreen from "./components/HomeScreen";
import Login from "./components/Login";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

export default function MainContentArea() {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  console.log('eeee')

  return (
  <>
       {!user && <HomeScreen />}
       <Login />
     <Text style={{ fontSize: 40 }}>{user ? `Hello (${user.email})` : "Please Sign In"}</Text> 
       {/* <HomeScreen /> */}

       {user && <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>}
</>
  );
}
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "orange",
    accent: "teal",
  },
};
