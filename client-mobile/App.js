import React, {useContext} from "react";
import { SafeAreaView,  } from "react-native";
import { HOST_SERVER } from "./util/hostServer";
import MainContentArea from "./MainContentArea";
import SelectedQuest from "./components/SelectedQuest";
import QrScanner from "./components/questing/QrScanner";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
// import { AuthContextProvider, AuthContext } from "./firebase/AuthContext";
import AuthProvider from "./firebase/AuthProvider";
import FirebaseProvider from "./firebase/FirebaseProvider";

export default function App() {

  // const Auth = useContext();
  // console.log(Auth)
  return (
   
    <FirebaseProvider>
        <AuthProvider>
          <MainContentArea />
        </AuthProvider>
      </FirebaseProvider>
  
  );
}

