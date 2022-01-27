import Navigation from "./components/Navigation";
import HomeScreen from "./components/HomeScreen";
import React, {useContext} from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import { AuthContext } from "./firebase/AuthContext";


export default function MainContentArea() {
  const Auth = useContext(AuthContext);
  const user = Auth.user
  console.log('eeee')

  return (
    <>
      {!user && <HomeScreen />}
      {/* <Quest
        questName = "Downtown Tour Calgary"
        checkPoint = {0} // pass through current quest checkpoint if you stopped in the middle
      /> */}
      {/* <QrScanner /> */}
      {/* <Login /> */}
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
  
