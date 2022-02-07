import React, { useContext } from "react";
import { View, Text, StatusBar } from "react-native";
import { AuthContext } from "./firebase/AuthProvider";
import Navigation from "./components/Navigation";
import { Provider as PaperProvider, DefaultTheme, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { QuestContext } from "./context/QuestContext"

let StatusBarTheme = () => {
  let insets = useSafeAreaInsets()
  let topInset = insets.top
  let theme = useTheme()


  const questContext = useContext(QuestContext);
  const insideGeofence = questContext.insideGeofence;

  // console.log ("insets", insets, topInset, theme.colors.primary)

  return (
    <>
      <View
        style={{
          width: "100%",
          height: topInset, // For all devices, even X, XS Max
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor:
            (!insideGeofence ?
              theme.colors.primary : theme.colors.accent),
        }}
      />
    </>
  )
}

export default function MainContentArea() {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  return (
    <>
      <StatusBarTheme />
      <StatusBar />
      <Navigation />
    </>
  );
}
