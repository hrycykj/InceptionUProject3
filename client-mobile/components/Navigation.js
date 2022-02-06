import * as React from "react";
import { BottomNavigation, Text, Surface, useTheme } from "react-native-paper";
import QuestList from "./Quest/QuestList";
import { StyleSheet, View } from "react-native";
import QrScanner from "./map-components/QrScanner";
import Quest from "./map-components/Quest";
import UserInfo from "./UserInfo";
import QuestMap from './map-components/QuestMap'

import { AuthContext } from "../firebase/AuthProvider";
import { QuestContext } from "../context/QuestContext";
import UserData from "./UserData";

const QuestRoute = (props) => {
  const { colors } = useTheme();
  return (
    <Surface style={{ backgroundColor: colors.background}}>
      <QuestList jumpTo={props.jumpTo}/>
    </Surface>
  );
};

const MapRoute = () => {
  const authContext = React.useContext(AuthContext);
  const user = authContext.user;
  return (
    <>
      {user && (
          <QuestMap/>
      )}
    </>
  );
};

const ProfileRoute = () => {
  const authContext = React.useContext(AuthContext);
  const user = authContext.user;
  return (
    <View>
      {/* <StatusBar /> */}
      <UserInfo />
    </View>
  );
};

const Navigation = () => {
  const authContext = React.useContext(AuthContext);
  const user = authContext.user;

  const questContext = React.useContext(QuestContext);
  const insideGeofence = questContext.insideGeofence;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
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
