import * as React from "react";
import { BottomNavigation, Text, Surface } from "react-native-paper";
import QuestList from "./QuestList";
import { StyleSheet } from "react-native";
import QrScanner from './questing/QrScanner'
import Quest from './Quest'

const QuestRoute = () => {
  return (
    <Surface style={styles.container}>
      <QuestList />
    </Surface>
  );
};

const MapRoute = () => {
  return (
    <>
      {/* <QrScanner /> */}
      {/* <View> */}
      {/* <Login /> */}
      <Quest
      questName = "Downtown Tour Calgary"
      // checkPoint = {0} // pass through current quest checkpoint if you stopped in the middle
    />
      {/* </View> */}
    </>
  );
};

const ProfileRoute = () => <Text>Profile</Text>;

const Navigation = () => {
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
    padding: 8,
  },
});

export default Navigation;