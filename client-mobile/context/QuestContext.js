import React, { useEffect, useState } from "react";
import { HOST_SERVER } from "../util/hostServer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CURRENT_QUEST_KEY = "current_quest_key";
const QuestContext = React.createContext();

const QuestContextProvider = (props) => {
  const children = props.children;
  const [quest, setQuset] = useState();
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

  //When app is loaded initially, get the current quest data from app storage
  useEffect(() => {
    getCurrentQuest();
  }, []);

  const selectQuest = (quest) => {
    setQuset(quest);
    storeCurrentQuest(quest);

    // fetch(`${HOST_SERVER}/api/quest/${questId}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setQuset(data);
    //     storeCurrentQuest(data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };
  const theValues = { quest, selectQuest, insideGeofence, setInsideGeofence };
  return (
    <QuestContext.Provider value={theValues}>{children}</QuestContext.Provider>
  );
};

module.exports = { QuestContext, QuestContextProvider };
