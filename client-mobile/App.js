import React, {useContext} from "react";
import { Text, View } from "react-native";
import Login from "./components/Login";
import { HOST_SERVER } from "./util/hostServer";

import SelectedQuest from "./components/SelectedQuest";
import QrScanner from "./components/QrScanner";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import { AuthContextProvider, AuthContext } from "./firebase/AuthContext";
import MainContentArea from "./MainContentArea";
export default function App() {

  const Auth = useContext(AuthContext);
  console.log(Auth)
  return (
    <AuthContextProvider>
      <MainContentArea/>     
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
