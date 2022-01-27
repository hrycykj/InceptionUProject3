import React, {useContext} from "react";
import { Text, View, SafeAreaView,  } from "react-native";
import Login from "./components/Login";
import { HOST_SERVER } from "./util/hostServer";

import SelectedQuest from "./components/SelectedQuest";
import QrScanner from "./components/questing/QrScanner";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import { AuthContextProvider, AuthContext } from "./firebase/AuthContext";
import MainContentArea from "./MainContentArea";
export default function App() {

  const Auth = useContext(AuthContext);
  console.log(Auth)
  return (
    <SafeAreaView>
     <AuthContextProvider>
      <MainContentArea/>     
     </AuthContextProvider>
    </SafeAreaView>
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
