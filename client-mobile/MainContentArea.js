import React, { useContext } from "react";
// import { SafeAreaView, View, Text } from "react-native";
import { AuthContext } from "./firebase/AuthProvider";
import Navigation from "./components/Navigation";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";


export default function MainContentArea() {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  console.log('eeee')

  return (
  <>
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
    primary: "#3fddc1", // "orange"
    accent: "#d56c06", // "teal"
    background: "#1d1d1f",
    // surface: "#1d1d1f",
    notification: "#3fddc1"
  },
};
