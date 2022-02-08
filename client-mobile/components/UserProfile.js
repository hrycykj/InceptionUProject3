import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  useTheme,
} from 'react-native-paper';


const UserProfile = (props) => {
  let defaultTheme = useTheme()
  let userData=props.userData
  return (
    <>
      <View style={{...defaultTheme}, styles.userInfoSection}>
        <View style={{...defaultTheme},{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: "https://i.ibb.co/swm9rww/Rabbit.png",
            }}
            size={80}
          />
          <View style={{...defaultTheme},{marginLeft: 20}}>
            <Title style={{...defaultTheme},[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{userData.username}</Title>
            <Caption style={{...defaultTheme},styles.caption}>{userData.baseLocation}</Caption>
          </View>
        </View>
      </View>
      <View style={{...defaultTheme},styles.infoBoxWrapper}>
          <View style={{...defaultTheme},[styles.infoBox, {
            
            borderRightWidth: 1
          }]}>
            <Title>{userData.completedQuests.length}</Title>
            <Caption>Quests Completed</Caption>
          </View>
          <View style={{...defaultTheme},styles.infoBox}>
            <Title>{userData.coins[0]}</Title>
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
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
