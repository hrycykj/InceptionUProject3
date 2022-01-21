
import React from "react";
import { Text, View } from "react-native";
import Login from "./components/Login";
import {HOST_SERVER} from './util/hostServer'

import MappingTest from './components/MappingTest'

export default function App() {

  return (
    <View>
          {/* <Login /> */}
          <MappingTest 
          checkpointCoords = {{latitude: 51.0452995902993, longitude: -114.0545529482637}}
          />
    </View>
  );
}
