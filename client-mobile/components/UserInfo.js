import React, { useEffect, useState, useContext } from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Button,
} from "react-native";

import { HOST_SERVER } from "../util/hostServer";

// import Navigation from "./Navigation";
import Login from "./Login";
import { AuthContext } from "../firebase/AuthProvider";


const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const UserInfo = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const points = props.points;
  const [userData, setUserData] = useState();
  const authContext = React.useContext(AuthContext);
  const user = authContext.user;

 
  const userDisplayName = user?.displayName;
  const userEmail = user?.email;



  /*
  useEffect(() => {
    (async () => {
      let fetchedData = await fetch(`${HOST_SERVER}/api/users/` + userName);
      fetchedData.json().then((data) => {
        setUserData(data);
        console.log("fetched userData data:", data);
      });
    })();
  }, []);
*/

  return (
    <SafeAreaView>
      <View style={styles.main_area}>
        {/* {!isSignedIn && (
          <ImageBackground
            style={styles.img}
            source={require("../assets/ipad.jpg")}
          />
        )} */}
        {!user && (
          <Login />
        )}

        <View>
          {/* {user && <Text>Already Logged in</Text>} */}
          {user && (
            <View>
              <Text style={styles.title}>
                Hello {userDisplayName || userEmail}
              </Text>

              <Text style={styles.subtitle}>{points} points</Text>

              <TouchableOpacity
                style={styles.button}
                // onPress={onPress}
              >
                <Text>Let's get started</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main_area: {
    height: h,
    width: w,
    alignItems: "center",
    // justifyContent: "center",
  },
  img: {
    height: "80%",
    width: "100%",
    // resizeMode: "contain",
  },
  welcome: {},
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "purple",
  },
  subtitle: {
    fontSize: 18,
    padding: 10,
    justifyContent: "center",
  },
  button: {
    fontWeight: "bold",
    alignItems: "center",
    backgroundColor: "#D56C06",
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
