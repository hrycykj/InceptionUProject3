import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../firebase/FirebaseProvider';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Button,
  FlatList
} from "react-native";

import { NotificationContext } from "../context/NotificationContext";


const UserData = (props) => {
  let [showUserData, setShowUserData] = useState(false)
  let userData=props.userData
  let setUserData=props.setUserData

  const notificationContext = useContext(NotificationContext);
  const showModal = notificationContext.showModal;

  useEffect(() => {
    if (showUserData&&userData) {
      showModal(() => {
        return (
          // update & deuglify modal details
          <View>
            <Text>{userData.UID}</Text>
            <Text>{userData.username}</Text>              
            <Text>{userData.baseLocation}</Text>
            <Text>Coins: {userData.coins}</Text>
            <Text>Current Quest: {userData.currentQuest}</Text>
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




