import React, { useContext } from "react";
import { AuthContextProvider, AuthContext } from "./firebase/AuthContext";
import { QuestContextProvider } from "./context/QuestContext";
import MainContentArea from "./MainContentArea";

export default function App() {
  const Auth = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <QuestContextProvider>
        <MainContentArea />
      </QuestContextProvider>
    </AuthContextProvider>
  );
}
