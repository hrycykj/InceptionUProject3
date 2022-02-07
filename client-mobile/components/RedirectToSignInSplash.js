import { Text, View, Button, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import Login from "./Login";
import { useTheme } from "react-native-paper";

const RedirectToSignInSplash = (props) => {
  let { colors } = useTheme();
  const defaultTheme = useTheme();
  const jumpTo = props.jumpTo;

  return (
    <>
    <View style={styles.contentMain}>
      <Text style={{ fontSize:30}}>
        Sign In to access the map.
      </Text>
      <Button style={{ ...defaultTheme}, styles.btn}
        mode="contained"
        onPress={() => {
          jumpTo("profile");
        }}
        title="sign in"
        accessibilityLabel="Redirect to login page"
        color={defaultTheme.colors.accent}
      ></Button>
      </View>
    </>
  );
      }

const styles = StyleSheet.create({
  contentMain: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    alignItems: "center",
    justifyContent: "center",
  },
btn:{padding:55, 
margin:30}
});


export default RedirectToSignInSplash;
