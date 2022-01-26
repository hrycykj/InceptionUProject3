import * as React from "react";
import { BottomNavigation, Text, Surface } from "react-native-paper";
import QuestList from "./QuestList";
import { StyleSheet } from "react-native";
import QrScanner from './QrScanner'
import SelectedQuest from './SelectedQuest'

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
      <QrScanner />
      {/* <View> */}
      {/* <Login /> */}
      <SelectedQuest questName="Downtown Tour Calgary" />
      {/* </View> */}
    </>
  );
};

const ProfileRoute = () => <Text>Profile</Text>;

const Navigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "quest", title: "Quest", icon: "map-plus" },
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
