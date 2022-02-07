// import * as React from "react";
import React, { useEffect, useState, useContext } from "react";
import { BottomNavigation, Text, Surface, useTheme } from "react-native-paper";
import QuestList from "./Quest/QuestList";
import { StyleSheet, View } from "react-native";
import QrScanner from "./map-components/QrScanner";
import Quest from "./map-components/Quest";
import UserInfo from "./UserInfo";
import QuestMap from './map-components/QuestMap'
import { NotificationContext } from "../context/NotificationContext";

import { AuthContext } from "../firebase/AuthProvider";
import { QuestContext } from "../context/QuestContext";
import UserData from "./UserData";
import UserProfile from "./UserProfile";




const QuestRoute = (props) => {
  const { colors } = useTheme();
  return (
    <Surface style={{ backgroundColor: colors.background}}>
      <QuestList jumpTo={props.jumpTo}/>
    </Surface>
  );
};

const MapRoute = (props) => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const notificationContext = useContext(NotificationContext);
  const showModal = notificationContext.showModal;

  console.log("HANNAH")
  
  return (
    <>
      {user && (
          <QuestMap/>
      )}
      {!user && <RedirectToSignInSplash jumpTo={props.jumpTo}/>}
    </>
  );
};

const ProfileRoute = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  return (
    <View>
      {/* <StatusBar /> */}
      {/* <UserInfo /> */}
      <UserInfo />
    </View>
  );
};

const Navigation = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  const questContext = useContext(QuestContext);
  const insideGeofence = questContext.insideGeofence;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "quest", title: "Quest", icon: "map-marker-distance" },
    { key: "map", title: "Map", icon: "map-search" },
    { key: "profile", title: "Profile", icon: "account-circle" },
  ]);

  const { colors } = useTheme();

  const renderScene = BottomNavigation.SceneMap({
    quest: QuestRoute,
    map: MapRoute,
    profile: ProfileRoute,
  });



  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={
        !insideGeofence
          ? { backgroundColor: colors.primary }
          : { backgroundColor: colors.accent }
      }
    />
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 8,
//     paddingTop: 16,
//   },
// });

export default Navigation;
