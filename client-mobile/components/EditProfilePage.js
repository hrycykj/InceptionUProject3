import React from 'react';
import {View, StyleSheet} from 'react-native';


const Editprofile = () => {
    return (
        <View>
            <Text style={{...defaultTheme},{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            Edit Profile
            </Text>
        <View style={{...defaultTheme},styles.action}>
          <TextInput
            placeholder="Username"
            autoCorrect={false}            
          />
        </View>
        <View style={{...defaultTheme},styles.action}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCorrect={false}
          />
        </View>
        <View style={{...defaultTheme},styles.action}>
          <TextInput
            placeholder="Location"
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity style={{...defaultTheme},styles.commandButton} onPress={() => {}}>
          <Text style={{...defaultTheme},styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
        </View>
    )
}
export default Editprofile;

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
