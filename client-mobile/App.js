import React, { useContext } from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
// import { HOST_SERVER } from "./util/hostServer";
import MainContentArea from "./MainContentArea";
import { Provider as PaperProvider, DefaultTheme, useTheme } from "react-native-paper";

// import { AuthContextProvider, AuthContext } from "./firebase/AuthContext";
import AuthProvider from "./firebase/AuthProvider";
import FirebaseProvider from "./firebase/FirebaseProvider";
import { QuestContextProvider } from "./context/QuestContext";
import { NotificationContextProvider } from "./context/NotificationContext";



export default function App() {
  // const Auth = useContext();
  // console.log(Auth)
  return (
    <FirebaseProvider>
      <AuthProvider>
        <PaperProvider theme={theme}>
          <QuestContextProvider>
            <NotificationContextProvider>
              <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                  <MainContentArea />
                </SafeAreaView>
              </SafeAreaProvider>
            </NotificationContextProvider>
          </QuestContextProvider>
        </PaperProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3fddc1",
    accent: "#d56c06",
    background: "#d5f8f1", //#808080 (light grey), #dd3f41 (offshade marron), #d5f8f1 (light tint of original colour), #7cs09a (mix of grey and original colour), #d9c3cd (?), #80e9d6 (?)
    // surface: "#1d1d1f",
    text: "#1d1d1f",
    // disabled: "#",
    placeholder: "#808080",
    // onSurface: "#3fddc1",
    notification: "#3fddc1",

  },
};
