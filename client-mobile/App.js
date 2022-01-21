
import React from "react";
import { Text, View } from "react-native";
import Login from "./components/Login";
import {HOST_SERVER} from './util/hostServer'

export default function App() {
  console.log(HOST_SERVER)

  fetch(`${HOST_SERVER}/api/checkPoint`).then(res=>res.json()).then(data=>{
    console.log(data)
  })
  return (
    <View>
          <Login />
    </View>
  );
}
