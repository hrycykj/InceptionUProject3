import React, { useContext } from "react";
// import { SafeAreaView,  } from "react-native";
// import { HOST_SERVER } from "./util/hostServer";
import MainContentArea from "./MainContentArea";
// import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
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
        <QuestContextProvider>
          <NotificationContextProvider>
            <MainContentArea />
          </NotificationContextProvider>
        </QuestContextProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
}
