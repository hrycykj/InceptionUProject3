
import React from "react";
import { Text, View } from "react-native";
import Login from "./components/Login";
import {HOST_SERVER} from './util/hostServer'

import SelectedQuest from './components/SelectedQuest'
import QrScanner from './components/QrScanner'
import Quest from './components/Quest'

export default function App() {

  console.log (HOST_SERVER)

  return (
    <>
    <Quest
      questName = "Downtown Tour Calgary"
      // checkPoint = {0} // pass through current quest checkpoint if you stopped in the middle
    />
    {/* <QrScanner /> */}
    {/* <Login /> */}
    </>
  );
}

