import React from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
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
