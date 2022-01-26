import React from "react";
import { Text, View } from "react-native";
import Login from "./components/Login";
import {HOST_SERVER} from './util/hostServer'

import SelectedQuest from './components/SelectedQuest'
import QrScanner from './components/QrScanner'
import Quest from './components/Quest'
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <>
    <Quest
      questName = "Downtown Tour Calgary"
      // checkPoint = {0} // pass through current quest checkpoint if you stopped in the middle
    />
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
