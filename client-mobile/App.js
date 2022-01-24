
import React from "react";
import { Text, View } from "react-native";
import Login from "./components/Login";
import {HOST_SERVER} from './util/hostServer'

import SelectedQuest from './components/SelectedQuest'
import QrScanner from './components/QrScanner'

export default function App() {

  console.log (HOST_SERVER)

  return (
    <>
      <QrScanner />
    {/* <View> */}
    {/* <Login /> */}
    <SelectedQuest 
          questName = "Downtown Tour Calgary"
           />
    {/* </View> */}
    </>
  );
}

