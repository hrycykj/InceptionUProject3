import React, {useContext} from "react";
import { SafeAreaView, StyleSheet } from "react-native";
// import { HOST_SERVER } from "./util/hostServer";
import MainContentArea from "./MainContentArea";
// import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
// import { AuthContextProvider, AuthContext } from "./firebase/AuthContext";
import AuthProvider from "./firebase/AuthProvider";
import FirebaseProvider from "./firebase/FirebaseProvider";
import { QuestContextProvider } from "./context/QuestContext";

export default function App() {

  // const Auth = useContext();
  // console.log(Auth)
  return (
   
    <FirebaseProvider>
        <AuthProvider>
          <QuestContextProvider>
            <SafeAreaView style={styles.container}>
              <MainContentArea />
            </SafeAreaView>
          </QuestContextProvider>
        </AuthProvider>
    </FirebaseProvider>
  
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  }
})