import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  useTheme,
} from 'react-native-paper';
import { AuthContext } from "../../firebase/AuthProvider"


const UserProfile = (props) => {
  let defaultTheme = useTheme()
  let userData=props.userData
  let showUserData=props.showUserData
  let setShowUserData=props.setShowUserData

  const authContext = React.useContext(AuthContext)
  const user = authContext.user


  let onPress = () => {
    setShowUserData(!showUserData)
  }
  return (
    <>
      <View style={{...defaultTheme}, styles.userInfoSection}>
        <View style={{...defaultTheme},{flexDirection: 'row', marginTop: 15}}>
          <TouchableOpacity
                style={{...defaultTheme}}
                onPress={onPress}
              >
            <Avatar.Image 
              source={
                require('../../assets/Logo_trans.png')
                // {uri: "https://i.ibb.co/swm9rww/Rabbit.png",}
              }
              size={100}
            />
          </TouchableOpacity>
          <View style={{...defaultTheme},{marginLeft: 20}}>
            <Title style={{...defaultTheme},[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>
              {userData?.username===""
                ? user?.email
                : userData?.username}
            </Title>
            <Caption style={{...defaultTheme},styles.caption}>{userData?.baseLocation}</Caption>
          </View>
        </View>
      </View>
      <View style={{...defaultTheme},styles.infoBoxWrapper}>
          <View style={{...defaultTheme},[styles.infoBox, {
            
            borderRightWidth: 1
          }]}>
            <Title>{userData?.completedQuests?.length}</Title>
            <Caption>Quests Completed</Caption>
          </View>
          <View style={{...defaultTheme},styles.infoBox}>
            {/* {console.log('user data at the coins error',userData?.coins)} */}
            <Title>{userData?.coins}</Title>
            <Caption>Coins</Caption>
          </View>
      </View>
      <View>
        
      </View>

      </>
  );};

  export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
