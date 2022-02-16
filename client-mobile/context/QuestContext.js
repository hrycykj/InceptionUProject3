import React, { useContext, useEffect, useState } from "react";
import { HOST_SERVER } from "../util/hostServer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {View,Text} from "react-native";
import { AuthContext } from "../firebase/AuthProvider";
 
const CURRENT_QUEST_KEY = "current_quest_key";
const CURRENT_CHECKPOINT_INDEX_KEY = "current_checkpoint_index_key"
const CURRENT_CHECKPOINT_KEY = "current_checkpoint_key"

const QuestContext = React.createContext();

const QuestContextProvider = (props) => {
  const children = props.children;
  const [quest, setQuset] = useState();
  const [checkPointIndex, setCheckPointIndex] = useState()
  const [currentCheckPoint, setCurrentCheckPoint] = useState()
  const [insideGeofence, setInsideGeofence] = useState(false)
  const [completedQuests, setCompletedQuests] = useState ([])
  const authContext = useContext(AuthContext)

  const storeCurrentQuest = async (data) => {
    try {
      const quest = JSON.stringify(data);
      await AsyncStorage.setItem(CURRENT_QUEST_KEY, quest);
    } catch (e) {
      // saving error
    }
  };

  const getCurrentQuest = async () => {
    try {
      let currentQuest = await AsyncStorage.getItem(CURRENT_QUEST_KEY);
      if (!quest) {
        console.log('We got the local quest info!', JSON.parse(currentQuest))
        currentQuest = JSON.parse(currentQuest) || "Downtown Tour Calgary"
        setQuset(currentQuest);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const storeCurrentCheckPoint = async (cpData, cpIndexData) =>{
    try {
      const cp = JSON.stringify(cpData);
      const cpIndex = JSON.stringify(cpIndexData);
      await AsyncStorage.setItem(CURRENT_CHECKPOINT_KEY, cp);
      await AsyncStorage.setItem(CURRENT_CHECKPOINT_INDEX_KEY, cpIndex);
    } catch (e) {
      // saving error
    }
  }
  const getCurrentCheckPoint = async () =>{
    try {
      let cp = await AsyncStorage.getItem(CURRENT_CHECKPOINT_KEY);
      let cpIndex = await AsyncStorage.getItem(CURRENT_CHECKPOINT_INDEX_KEY);

      if (!currentCheckPoint) {
        cp = JSON.parse(cp)
        setCurrentCheckPoint(cp);
      }
      if (!checkPointIndex) {
        cpIndex = JSON.parse(cpIndex) || 0
        setCheckPointIndex(cpIndex);
      }

    } catch (e) {
      console.error(e);
    }
  }
  const setNextCheckPoint = async () =>{
    let nextIndex = checkPointIndex + 1
    storeCurrentCheckPoint(quest.checkPoints[nextIndex], nextIndex)
    setCheckPointIndex(nextIndex)
    setCurrentCheckPoint(quest.checkPoints[nextIndex])
  }
  //When app is loaded initially, get the current quest data from app storage
  useEffect(() => {
    getCurrentQuest();
    getCurrentCheckPoint()
  }, []);

  const selectQuest = (quest) => {
    setQuset(quest);
    setCheckPointIndex(0)
    setCurrentCheckPoint(quest.checkPoints[0])
    storeCurrentQuest(quest);
    storeCurrentCheckPoint(quest.checkPoints[0], 0)
  };

  const completeQuest = (questId) => {
    if (!completedQuests.includes(questId))
    {
    const newCompletedQuests = [...completedQuests, questId]
    setCompletedQuests (newCompletedQuests)
    }
  };

  useEffect(() => {
    if (authContext.user) {
      fetch(`${HOST_SERVER}/api/users/` + authContext.user?.uid)
      .then ((fetchedData) => fetchedData.json())
      .then ((userData) => {
        let userCompletedQuests = userData.completedQuests
        setCompletedQuests(userCompletedQuests)
        console.log (`MOOOOOOOOOOOOOOOOOO`,userData)
      })
    }
      
  }, [authContext]);
  
  const theValues = { completeQuest, completedQuests, quest, selectQuest, insideGeofence, setInsideGeofence, checkPointIndex, currentCheckPoint, setNextCheckPoint};
  if (!quest) {
    return <View><Text>Loading...</Text></View>;
  } else {
    return (
      <QuestContext.Provider value={theValues}>{children}</QuestContext.Provider>
    );
  }
};

module.exports = { QuestContext, QuestContextProvider };
