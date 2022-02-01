import React, {useContext} from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
// import { HOST_SERVER } from "./util/hostServer";
import MainContentArea from "./MainContentArea";
import { useTheme } from "react-native-paper";
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
            <SafeAreaProvider>
              <SafeAreaView style={styles.container}>
                <MainContentArea />
              </SafeAreaView>
            </SafeAreaProvider>
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