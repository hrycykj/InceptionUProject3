import React, { useContext } from "react";
import { View, Text, StatusBar } from "react-native";
import { AuthContext } from "./firebase/AuthProvider";
import Navigation from "./components/Navigation";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { QuestContext } from "./context/QuestContext"

let StatusBarTheme = () => {
  let insets = useSafeAreaInsets()
  let topInset = insets.top

  const questContext = useContext(QuestContext);
  const insideGeofence = questContext.insideGeofence;

  console.log ("insets", insets, topInset, theme.colors.primary)

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
  console.log('eeee')

  return (
  <>
    <StatusBarTheme />
    <StatusBar />
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
</>
  );
}
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3fddc1",
    accent: "#d56c06",
    background: "#808080",
    // surface: "#1d1d1f",
    text: "#1d1d1f",
    // disabled: "#",
    // placeholder: "#",
    backdrop: "#d56c06",
    // onSurface: "#"
    notification: "#3fddc1",

  },
};
