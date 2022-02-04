import React, { useState, useContext } from 'react';
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




const UserData = (props) => {
    let [showUserData, setShowUserData] = useState(false)
    let userData=props.userData
    let setUserData=props.setUserData
    // const [users, setUsers]=useState([])
    // const fbContext = useContext(FirebaseContext);
    // const db = fbContext.db;

    // const getUsersData = async () => {
    //     try {
    //       console.log("AAAAAAAAAAAAAAAAAAA")
    //       let collectionRef = collection(db, "users");
    //       let queryRef = query (collectionRef, orderBy("firstName"));
    //       let querySnap = await getDocs(queryRef);
    //       if (querySnap.empty) {
    //         console.log("No docs found");
    //       } else {
    //         let usersData = querySnap.docs.map((doc) => ({
    //           ...doc.data(),
    //           DOC_ID: doc.id,
    //         }));
    //         setUsers(usersData);
    //       }
    //     } catch (ex) {
    //       console.log("FIRESTORE FAILURE!", ex.message);
    //     }
    //   };
// 
      const getUsersData = () => {
        console.log("show user data", showUserData, userData.UID)
        setShowUserData=true
      }
    
      return (
        <>
        {/* <StatusBar /> */}
          <Button title= "Get User Data" onPress={() => getUsersData()}></Button>
          {showUserData &&
            <View>
              <Text>{userData.baseLocation}</Text>
              <Text>{userData.coins}</Text>
              <Text>{userData.currentQuest}</Text>
              <Text>{userData.username}</Text>              
            </View>
          }
        
       
        </>
      );
    };

export default UserData;




