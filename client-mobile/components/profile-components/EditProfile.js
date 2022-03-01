import React, { useState, useEffect } from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { useTheme, Text, } from 'react-native-paper'
import { HOST_SERVER } from "../../util/hostServer";
import { AuthContext } from "../../firebase/AuthProvider";


const EditProfile = (props) => {
    let userData=props.userData
    let setUserData=props.setUserData
    let setShowEditProfile=props.setShowEditProfile
    let showEditProfile=props.showEditProfile
    let [username, setUsername] = useState(userData?.username)
    let [userEmail, setUserEmail] = useState(userData?.userEmail)
    let [userLocation, setUserLocation] = useState(userData?.baseLocation)
    let [updateUserData, setUpdateUserData] = useState(false)
    let defaultTheme=useTheme()
 
    const authContext = React.useContext(AuthContext);
    const user = authContext.user;

    let onChangeUserData = () =>{
      let dataupdate = {
        ...userData,
        username: username,
        userEmail: userEmail,
        baseLocation: userLocation}
      setUserData(dataupdate)
      setUpdateUserData (true)
      // console.log(userData)
    }

    useEffect ( () => {
      (async () => {
        if (updateUserData) {
          fetch(`${HOST_SERVER}/api/users/` + user.uid, {
            method: "PUT",
            body: JSON.stringify(userData),
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then (()=> setUpdateUserData(false))
          .then (()=> {
            setReloadUserData(true)
          })
        }
      })()
    }, [updateUserData])

    return (
        <View>
            <Text style={{...defaultTheme},{marginTop: 10, fontSize: 30, fontWeight: 'bold'}}>
            Edit Profile
            </Text>
        <View style={{...defaultTheme},styles.action}>
          <TextInput
            placeholder="Username"
            autoCorrect={false}
            value={username}
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View style={{...defaultTheme},styles.action}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCorrect={false}
            value={userEmail}
            onChangeText={text => setUserEmail(text)}
          />
        </View>
        <View style={{...defaultTheme},styles.action}>
          <TextInput
            placeholder="Location"
            autoCorrect={false}
            value={userLocation}
            onChangeText={text => setUserLocation(text)}
          />
        </View>
        <TouchableOpacity 
        style={{...defaultTheme},styles.commandButton}
        onPress={() =>{
          onChangeUserData
          setShowEditProfile(!showEditProfile)
         }
        }
       >
          <Text style={{...defaultTheme},styles.panelButtonTitle}>Submit</Text>
           
        </TouchableOpacity>
        </View>
    )
}
export default EditProfile;


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
commandButton: {
    padding: 15,
    borderRadius: 10,

    alignItems: 'center',
    marginTop: 10,
    },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
    },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
    },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    },
});
