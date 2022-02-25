import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Button, Title, Subheading, TouchableRipple, useTheme } from "react-native-paper";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Login from "./Login";
import { HOST_SERVER } from "../../util/hostServer";
import UserData from "./UserData";
import { AuthContext } from "../../firebase/AuthProvider";
import { FirebaseContext } from "../../firebase/FirebaseProvider";
import { QuestContext } from "../../context/QuestContext"
import UserProfile from "./UserProfile";
import EditProfile from "./EditProfile";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const UserInfo = (props) => {
  // const [isSignedIn, setIsSignedIn] = useState(false);
  const questContext = useContext(QuestContext);
  const userData = questContext.userData
  const setUserData = questContext.setUserData
  let [newUser, setNewUser] = useState(null)
  let [showUserData, setShowUserData] = useState(false)
  let [showEditProfile, setShowEditProfile] = useState(false)
  const authContext = React.useContext(AuthContext);
  const firebaseContext = React.useContext(FirebaseContext)
  const user = authContext.user;
  // const SignOutUser=authContext.SignOutUser

  let defaultTheme = useTheme()
 
  // const userDisplayName = user?.displayName;
  const userEmail = user?.email;

 
  useEffect(() => {
    console.log('ANTI-MOOOOO')
    fetch(`${HOST_SERVER}/api/users/` + user?.uid)
      .then ((fetchedData) => fetchedData.json())
      .then ((isUserNew) => {
        if (isUserNew.UID=='empty') {
          console.log('new user page required')
          setNewUser(true)
        }
        return isUserNew
      })
      .then ((data) => {
        setUserData(data)
        return data
      })
      .then (()=> {
        console.log('finished user data fetch')
      })
  }, [user]);

  useEffect ( () => {
    (async () => {
      if ((userData?.UID=='empty')&&user) {
        setUserData({'userEmail':user.email})
        setShowEditProfile(true)
        setShowUserData(true)
        console.log('no userData and user logged in for',user.uid, user.email)
        let completed = ['Rabbit Hole User Registration']
        let req = {
          'UID': user.uid,
          'userEmail':user.email,
          'userType': 0, 
          'username':'',
          'currentQuest':'',
          'completedQuests': completed,
          'coins':0,
          'baseLocation':''
        }
        console.log ("This is a new user, please create a user profile form",req)
        console.log ('completed Quests:',req)
        // add in user info from user profile form and add to req object to write to database
        
        fetch(`${HOST_SERVER}/api/users/` + user.uid, {
          method: "POST",
          body: JSON.stringify(req),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then ((response)=>{
          setUserData(req)
          console.log(response)
        })
        .then (()=> setNewUser(false))
        .then (()=> {
          if (userData?.userType) {
            setShowUserData(false)
            setShowEditProfile(false)
          }
        })
      }
      
    })()
  }, [userData])







  return (
    // <SafeAreaView>
      <View style={{...defaultTheme},styles.main_area}>
        {!user && (
          <Login />
        )}
        <>
          {user && (
            <>
              <UserProfile 
                userData={userData}
                showUserData={showUserData}
                setShowUserData={setShowUserData}
              />
              {showUserData &&
                <UserData 
                  userData = {userData}
                  setUserData = {setUserData}
                  showUserData={showUserData}
                  setShowUserData={setShowUserData}
                  showEditProfile={showEditProfile}
                  setShowEditProfile={setShowEditProfile}
                />
              }
              {/* <Button
                style={{marginTop: 5, marginBottom: 5}}
                mode="contained"
                onPress={()=>{
                  SignOutUser()
                  setUserData(null)
                  // clearAllData()
                  }}
                title="Signout"
                accessibilityLabel="Sign Out From User Account"
                color= {defaultTheme.colors.accent}
              >
                Log out
              </Button> */}

              {/* <TouchableRipple 
                style={{...defaultTheme},styles.button}
                rippleColor="rgba(0, 0, 0, .32)"
                onPress={authContext.SignOutUser}
              >
                <Text>Log out</Text>
              </TouchableRipple> */}
              {/* <TouchableOpacity
                style={{...defaultTheme},styles.button}
                // onPress={onPress}
              >
                <Text>Let's get started</Text>
              </TouchableOpacity> */}
            </>
          )}
        </>
      </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main_area: {
    height: h,
    width: w,
    alignItems: "center",
    // justifyContent: "center",
  },
  // img: {
  //   height: "80%",
  //   width: "100%",
  //   // resizeMode: "contain",
  // },
  // welcome: {},
  // title: {
  //   fontSize: 30,
  //   fontWeight: "bold",
  //   // color: "purple",
  // },
  // subtitle: {
  //   fontSize: 18,
  //   padding: 10,
  //   justifyContent: "center",
  // },
  button: {
    // fontWeight: "bold",
    alignItems: "center",
    // backgroundColor: "#D56C06",
    borderRadius: 50,
    padding: 15,
  },
});

export default UserInfo;

// import { useEffect, useState } from 'react'
// import { View, Text } from 'react-native'
// import {HOST_SERVER} from '../../util/hostServer'

// let [userInfo, setUSerInfo] = useState ()

// const FetchQuest = (props) => {
//     let questName=props.questName
//     let quest=props.quest
//     let setQuest=props.setQuest
//     let setCoords=props.setCoords
//     let [message, setMessage] = useState('Fetching your Quest...')

//     return (
//         <View>
//             <Text>{message}</Text>
//         </View>
//     )
// }

// export default FetchQuest
