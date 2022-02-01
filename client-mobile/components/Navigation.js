import * as React from "react";
import { BottomNavigation, Text, Surface } from "react-native-paper";
import QuestList from "./QuestList";
import { StatusBar, StyleSheet, View } from "react-native";
import QrScanner from "./questing/QrScanner";
import Quest from "./Quest";
import UserInfo from "./UserInfo";
import { AuthContext } from "../firebase/AuthProvider";
import UserData from "./UserData";

const QuestRoute = () => {
  return (
    <Surface style={styles.container}>
      <QuestList />
    </Surface>
  );
};

const MapRoute = () => {
  const authContext = React.useContext(AuthContext);
  const user = authContext.user;
  return (
    <>
      {/* <QrScanner /> */}
      {/* <View> */}
      {/* <Login /> */}
      {user && (
        <Quest
          questName="Downtown Tour Calgary"
          // checkPoint = {0} // pass through current quest checkpoint if you stopped in the middle
        />
      )}
      {/* </View> */}
    </>
  );
};

const ProfileRoute = () => {
  const authContext = React.useContext(AuthContext);
  const user = authContext.user;
  return (
  <View>
    <StatusBar />
    <UserInfo />
  </View>)
};

const Navigation = () => {
  const authContext = React.useContext(AuthContext);
  const user = authContext.user;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "quest", title: "Quest", icon: "map-marker-distance" },
    { key: "map", title: "Map", icon: "map-search" },
    { key: "profile", title: "Profile", icon: "account-circle" },
  ]);

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
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 0,
  },
});

export default Navigation;
