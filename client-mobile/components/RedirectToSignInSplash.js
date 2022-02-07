import { Text, View, Button } from "react-native";
import React, { useState, useContext } from "react";
import Login from "./Login";
import { useTheme } from "react-native-paper";

const RedirectToSignInSplash = (props) => {
  let { colors } = useTheme();
  const defaultTheme = useTheme();
  const jumpTo = props.jumpTo;

  return (
    <>
      <Text style={{ backgroundColor: "red", fontSize: 40 }}>
        Please sign In to access the map.
      </Text>
      <Button
        style={{ ...defaultTheme }}
        mode="contained"
        onPress={() => {
          jumpTo("profile");
        }}
        title="Log in"
        accessibilityLabel="Redirect to login page"
        color={defaultTheme.colors.accent}
      ></Button>
    </>
  );
};

export default RedirectToSignInSplash;
