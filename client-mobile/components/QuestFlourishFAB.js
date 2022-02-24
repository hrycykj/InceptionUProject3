import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Text, Button, FAB, useTheme } from 'react-native-paper'
import { Icon } from 'react-native-elements';



const QuestFlourish = () => (
    <FAB
      style={styles.fab}
      
      icon="exclamation"
      onPress={() => console.log('Pressed')}
    />
  );
  
  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 20,
      left: 0,
      bottom: 0,
    },
  })
  
  export default QuestFlourish;