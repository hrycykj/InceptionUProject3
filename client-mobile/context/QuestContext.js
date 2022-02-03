import React, { useEffect, useState } from "react";
import { HOST_SERVER } from "../util/hostServer";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        currentQuest = JSON.parse(currentQuest)
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
        cpIndex = JSON.parse(cpIndex)
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
  const theValues = { quest, selectQuest, insideGeofence, setInsideGeofence, checkPointIndex, currentCheckPoint, setNextCheckPoint };
  return (
    <QuestContext.Provider value={theValues}>{children}</QuestContext.Provider>
  );
};

module.exports = { QuestContext, QuestContextProvider };
