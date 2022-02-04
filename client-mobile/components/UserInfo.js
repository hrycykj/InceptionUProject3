import React, { useEffect, useState, useContext } from "react";
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

import { HOST_SERVER } from "../util/hostServer";

// import Navigation from "./Navigation";
import Login from "./Login";
import { AuthContext } from "../firebase/AuthProvider";
import UserData from "./UserData";
import { FirebaseContext } from "../firebase/FirebaseProvider";


const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const UserInfo = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  // const points = props.points;
  const [userData, setUserData] = useState(null);
  let [newUser, setNewUser] = useState(false)
  const authContext = React.useContext(AuthContext);
  const firebaseContext = React.useContext(FirebaseContext)
  const user = authContext.user;
  const SignOutUser=authContext.SignOutUser

  let defaultTheme = useTheme()
 
  // const userDisplayName = user?.displayName;
  const userEmail = user?.email;

  // const onPress = () => {
  //   console.log("Let's get started button pressed")
  // }

  useEffect ( () => {
    (async () => {
      if ((!userData)&&user) {
        console.log('no userData and user logged in for',user.uid, user.email)
        let req = {
          'UID': user.uid,
          'userEmail':user.email,
          'userType': 0, 
          'userName':'',
          'currentQuest':'',
          'completedQuests':[],
          'coins':[],
          'baseLocation':''
        }
        console.log ("This is a new user, please create a user profile form")
        // add in user info from user profile form and add to req object to write to database
        const response = await fetch(`${HOST_SERVER}/api/users/` + user.uid, {
          method: "POST",
          body: JSON.stringify(req),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setNewUser(false)
      }
    })()
  }, [newUser, user])


  useEffect(() => {
    (async () => {
      if (user) {
          let fetchedData = await fetch(`${HOST_SERVER}/api/users/` + user.uid);
          // console.log('checking data: ',fetchedData.ok)
          if (fetchedData) {
            fetchedData.json().then((data) => { //figure out how to avoid [Unhandled promise rejection: SyntaxError: JSON Parse error: Unexpected EOF] when blank
              setUserData(data);
              console.log("fetched userData data:", data);
            });
          }
      }
      if (!await userData) {
        console.log("new user page required")
        setNewUser(true)
      }
    })();
  }, [user]);


  return (
    // <SafeAreaView>
      <View style={{...defaultTheme},styles.main_area}>
        {/* {!isSignedIn && (
          <ImageBackground
            style={styles.img}
            source={require("../assets/ipad.jpg")}
          />
        )} */}
        {!user && (
          <Login />
        )}

        <>
          {/* {user && <Text>Already Logged in</Text>} */}
          {user && (
            <>
              <Title>
                Hello {userData?.username || userEmail}
                {/* Hello {userEmail} */}
              </Title>

              {/* <Subheading>{points} points</Subheading> */}

              <Button
                style={{marginTop: 5, marginBottom: 5}}
                mode="contained"
                onPress={()=>{
                  SignOutUser()
                  setUserData(null)
                  }}
                title="Signout"
                accessibilityLabel="Sign Out From User Account"
                color= {defaultTheme.colors.accent}
              >
                Log out
              </Button>
              <UserData 
                userData = {userData}
                setUserData = {setUserData}
              />

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
