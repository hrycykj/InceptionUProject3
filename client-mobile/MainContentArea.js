import React, { useContext } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { AuthContext } from "./firebase/AuthProvider";
import Navigation from "./components/Navigation";
import UserInfo from "./components/UserInfo";
import Login from "./components/Login";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";


export default function MainContentArea() {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  console.log('eeee')

  return (
  <>
       {/* {!user && <HomeScreen />} */}
      {/* <Quest
        questName = "Downtown Tour Calgary"
        checkPoint = {0} // pass through current quest checkpoint if you stopped in the middle
      /> */}
      {/* <QrScanner /> */}
      {/* <Login /> */}
     <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
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
