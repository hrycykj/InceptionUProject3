import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../firebase/FirebaseProvider";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Button,
  FlatList,
} from "react-native";
import {
  Text,
  FAB,
  Portal,
  Provider,
  List,
  useTheme,
} from "react-native-paper";

import { NotificationContext } from "../../context/NotificationContext";
import { AuthContext } from "../../firebase/AuthProvider";
import { QuestContext } from "../../context/QuestContext"
import UserProfile from "./UserProfile";
import EditProfile from "./EditProfile";
import { colors } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserData = (props) => {
  // let [showUserData, setShowUserData] = useState(false)
  let [showEditProfile, setShowEditProfile] = useState(false);
  let userData = props.userData;
  let setUserData = props.setUserData;
  let showUserData = props.showUserData;
  let setShowUserData = props.setShowUserData;

  const notificationContext = useContext(NotificationContext);
  const showModal = notificationContext.showModal;
  const defaultTheme = useTheme();

  const authContext = useContext(AuthContext);
  const SignOutUser=authContext.SignOutUser
  const user = authContext.user;

  const questContext = useContext(QuestContext)
  const setCompletedQuests = questContext.setCompletedQuests
  

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;


///////////////////////////// ADD FUNCTION THAT RESETS ALL INITIAL KEYS
  function clearAllData() {
    AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(() => alert('Logout successful'));
}

  return (
    <>
      <View>
    
        {(!showEditProfile) &&
          <View style={{...defaultTheme}, styles.container}>
            <Text>{userData?.UID}</Text>
            <Text> 
              {userData?.username===""
              ? user?.email
              : userData?.username}
            </Text>              
            <Text>{userData?.baseLocation}</Text>
            <Text>Coins: {userData?.coins}</Text>
            <Text>Current Quest: {userData?.currentQuest}</Text>
            <Text>Completed Quests:</Text>
            {userData?.completedQuests?.map((quest) => {
              return (
                  <Text key={quest}>
                    {quest}
                  </Text>
                )
              })}
          </View>
        }
        {(showEditProfile) &&
          <EditProfile 
            userData={userData}
            setUserData={setUserData}
            showEditProfile={showEditProfile}
            setShowEditProfile={setShowEditProfile}
          />
        }
      </View>
      <>
      <Provider>
        <Portal>
          <FAB.Group
            style={({ ...defaultTheme }, styles.fab)}
            open={open}
            icon={open ? "close" : "cogs"}
            actions={[
              {
                icon: "account-edit",
                label: "account-edit",
                onPress: () => {
                  console.log("pressed edit profile", showEditProfile);
                  setShowEditProfile(!showEditProfile);
                },
              },
              {
                icon: "logout",
                label: "Logout",
                onPress: () => {
                  console.log("Pressed logout");
                  SignOutUser()
                  setUserData(null)
                  setCompletedQuests([])
                  // set current checkpoint index to zero
                  clearAllData()
                },
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
              }
            }}
          />
        </Portal>
      </Provider>
      </>
      {/* <Button title= "Get User Data" onPress={() => getUsersData()}></Button> */}

      {/* <FAB
      style={{...defaultTheme}, styles.fab}
          icon="account-edit"
          onPress={() => {
          console.log('pressed', showEditProfile)
          setShowEditProfile(!showEditProfile)
          }}
          title="Edit Profile"
          accessibilityLabel="Edit User Profile" 
           />*/}
    </>
  );
};

export default UserData;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    marginBottom: 70,
    marginRight: 20,
    right: 0,
    bottom: 0,
  },
});







