import * as React from "react";
import { BottomNavigation, Text, Surface, useTheme } from "react-native-paper";
import QuestList from "./QuestList";
// import { StyleSheet } from "react-native";
import Quest from "./Quest";
import UserInfo from "./UserInfo";

import { AuthContext } from "../firebase/AuthProvider";
import { QuestContext } from "../context/QuestContext"

const QuestRoute = () => {
  return (
    <Surface>
      <QuestList />
    </Surface>
  );
};

const MapRoute = () => {
  const authContext = React.useContext(AuthContext);
  const user = authContext.user;
  return (
    <>
      {user && (
        <Quest
          questName="Downtown Tour Calgary"
          // checkPoint = {0} // pass through current quest checkpoint if you stopped in the middle
        />
      )}
    </>
  );
};

const ProfileRoute = () => {
  const authContext = React.useContext(AuthContext);
  const user = authContext.user;
  return <UserInfo />
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

  const { colors } = useTheme()

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
      barStyle={!insideGeofence ? {backgroundColor: colors.primary} : {backgroundColor: colors.accent}}
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
