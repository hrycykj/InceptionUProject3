import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../firebase/FirebaseProvider';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Button,
  FlatList,
} from "react-native";
import { Text, FAB, List, useTheme } from 'react-native-paper'

import { NotificationContext } from "../context/NotificationContext";
import UserProfile from './UserProfile'
import { colors } from 'react-native-elements';


const UserData = (props) => {
  let [showUserData, setShowUserData] = useState(false)
  let [expanded, setExpanded] = useState(false)
  let userData=props.userData
  let setUserData=props.setUserData

  const notificationContext = useContext(NotificationContext);
  const showModal = notificationContext.showModal;
  const defaultTheme = useTheme()

  const onEdit = () => {
    console.log ('edit profile button pressed')
  }

  useEffect(() => {
    if (showUserData&&userData) {
      showModal(() => {
        return (
          // update & deuglify modal details
          <View>
            <UserProfile userData={userData} />
            <View style={{...defaultTheme}, styles.container}>
              <Text>{userData.UID}</Text>
              <Text>{userData.username}</Text>              
              <Text>{userData.baseLocation}</Text>
              <Text>Coins: {userData.coins}</Text>
              <Text>Current Quest: {userData.currentQuest}</Text>
              <Text>Completed Quests:</Text>
              {userData.completedQuests.map((quest) => {
                return (
                    <Text key={quest}>
                      {quest}
                    </Text>
                  )
                })}
              <FAB
                style={{...defaultTheme}, styles.fab}
                small
                icon="account-edit"
                onPress={onEdit}
                title="Edit Profile"
                accessibilityLabel="Edit User Profile"
              />
            </View>
          </View>
        )
      })
      setShowUserData(false)
    }
  }, [showUserData]);

  const getUsersData = () => {
    console.log("show user data", showUserData, userData.UID)
    setShowUserData(true)
  }
    
  return (
    <>
      <Button title= "Get User Data" onPress={() => getUsersData()}></Button>
    </>
  );
};

export default UserData;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: "absolute",
    margin: 0,
    right: 0,
    bottom: 0,
  },
});


