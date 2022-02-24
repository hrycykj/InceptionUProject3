import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Image, Dimensions, Alert } from "react-native";
import { Text, Button, FAB, useTheme } from 'react-native-paper'
import { Icon } from 'react-native-elements';
import { QuestContext } from "../context/QuestContext"




const QuestFlourish = () => {
  const questContext = useContext(QuestContext)
  const checkPointIndex = questContext.checkPointIndex
  const questDescriptor = questContext.quest.questFlourish
  console.log("boom quest", questContext.quest)
  return(
    <>
    <View>
      {(checkPointIndex == 0) &&
      <FAB
      style={styles.fab}
      
      icon="exclamation"
      onPress={() => {
        Alert.alert(
          "Quest Details",
          questDescriptor,
          [
            {
              text: "Back to Map",
              onPress: () => {

              }
            },
            
          ]
          ); 
        }}
      />}
    </View>
    </>
  )}
  
  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 20,
      left: 0,
      bottom: 0,
    },
  })
  
  export default QuestFlourish;