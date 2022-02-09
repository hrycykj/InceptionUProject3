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
import Editprofile from './EditProfilePage';
import { colors } from 'react-native-elements';


const UserData = (props) => {
  // let [showUserData, setShowUserData] = useState(false)
  let [showEditProfile, setShowEditProfile] = useState(false)
  let userData=props.userData
  let setUserData=props.setUserData
  let showUserData=props.showUserData
  let setShowUserData=props.setShowUserData

  const notificationContext = useContext(NotificationContext);
  const showModal = notificationContext.showModal;
  const defaultTheme = useTheme()

  // useEffect(() => {
  //   if (showUserData&&userData) {
  //     showModal(() => {
  //       return (
  //         // update & deuglify modal details
  //             <View>
  //               {/* <UserProfile userData={userData} /> */}
  //               <View style={{...defaultTheme}, styles.container}>
  //                 <Text>{userData.UID}</Text>
  //                 <Text>{userData.username}</Text>              
  //                 <Text>{userData.baseLocation}</Text>
  //                 <Text>Coins: {userData.coins}</Text>
  //                 <Text>Current Quest: {userData.currentQuest}</Text>
  //                 <Text>Completed Quests:</Text>
  //                 {userData.completedQuests.map((quest) => {
  //                   return (
  //                       <Text key={quest}>
  //                         {quest}
  //                       </Text>
  //                     )
  //                   })}
  //               </View>
  //           <FAB
  //             style={{...defaultTheme}, styles.fab}
  //             small
  //             icon="account-edit"
  //             onPress={() => {
  //               console.log('pressed', showEditProfile)
  //               setShowEditProfile(showEditProfile+1)
  //             }}
  //             title="Edit Profile"
  //             accessibilityLabel="Edit User Profile"
  //           />
  //         </View>
  //       )
  //     })
  //     setShowUserData(false)
  //   }
  // }, [showUserData]);

  // const getUsersData = () => {
  //   console.log("show user data", showUserData, userData.UID)
  //   setShowUserData(true)
  // }
    
  return (
    <>
      <View>
        <FAB
          style={{...defaultTheme}, styles.fab}
          small
          icon="account-edit"
          onPress={() => {
            console.log('pressed', showEditProfile)
            setShowEditProfile(!showEditProfile)
          }}
          title="Edit Profile"
          accessibilityLabel="Edit User Profile"
        />
        {(!showEditProfile) &&
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
          </View>
        }
        {(showEditProfile) &&
          <Editprofile />
        }
      </View>
      {/* <Button title= "Get User Data" onPress={() => getUsersData()}></Button> */}
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
    // position: "absolute",
    margin: 10,
    right: 0,
    bottom: 0,
  },
});


