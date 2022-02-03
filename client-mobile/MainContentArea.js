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
    background: "#d5f8f1", //#808080 (light grey), #dd3f41 (offshade marron), #d5f8f1 (light tint of original colour), #7cs09a (mix of grey and original colour), #d9c3cd (?), #80e9d6 (?)
    // surface: "#1d1d1f",
    text: "#1d1d1f",
    // disabled: "#",
    placeholder: "#808080",
    backdrop: "#d56c06",
    // onSurface: "#"
    notification: "#3fddc1",

  },
};
