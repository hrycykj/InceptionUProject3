import React from "react";
import { Text, View } from "react-native";
import Login from "./components/Login";
import {HOST_SERVER} from './util/hostServer'

import SelectedQuest from './components/SelectedQuest'
import QrScanner from './components/QrScanner'
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import Navigation from "./components/Navigation";
import HomeScreen from "./components/HomeScreen";
import {AuthContextProvider} from "./firebase/AuthContext"

export default function App() {
  return (
    <AuthContextProvider>
   
     <HomeScreen
        userName= "Hannah"
        points="280"
     />
    {/* <Quest
      questName = "Downtown Tour Calgary"
      checkPoint = {0} // pass through current quest checkpoint if you stopped in the middle
    /> */}
    {/* <QrScanner /> */}
    {/* <Login /> */}
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
       </AuthContextProvider>
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
