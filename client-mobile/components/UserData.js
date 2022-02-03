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




const UserData = () => {
    const [users, setUsers]=useState([])
    const fbContext = useContext(FirebaseContext);
    const db = fbContext.db;

    const getUsersData = async () => {
        try {
          console.log("AAAAAAAAAAAAAAAAAAA")
          let collectionRef = collection(db, "users");
          let queryRef = query (collectionRef, orderBy("firstName"));
          let querySnap = await getDocs(queryRef);
          if (querySnap.empty) {
            console.log("No docs found");
          } else {
            let usersData = querySnap.docs.map((doc) => ({
              ...doc.data(),
              DOC_ID: doc.id,
            }));
            setUsers(usersData);
          }
        } catch (ex) {
          console.log("FIRESTORE FAILURE!", ex.message);
        }
      };
    
      return (
        <>
        <StatusBar />
          <Button title= "Get User Data" onPress={() => getUsersData()}></Button>
          
          {users.map((user) => {
            return (
              <Text key={user.DOC_ID}>
                {user.location}
                {user.points}
                {user.DOC_ID}
                {user.userDisplayName}
              </Text>
            );
          })}
        </>
      );
    };

export default UserData;




