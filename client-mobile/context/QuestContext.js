import React, { useContext, useEffect, useState } from "react";
import { HOST_SERVER } from "../util/hostServer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";
import { AuthContext } from "../firebase/AuthProvider";


const CURRENT_QUEST_KEY = "current_quest_key";
const CURRENT_CHECKPOINT_INDEX_KEY = "current_checkpoint_index_key"
const CURRENT_CHECKPOINT_KEY = "current_checkpoint_key"

const QuestContext = React.createContext();

const updateUserCoins = (uid, coinsEarned) => {
  fetch(`${HOST_SERVER}/api/users/` + uid)
      .then ((fetchedData) => fetchedData.json())
      .then ((userData) => {
        console.log('User data thing', userData)
        let currentCoins = userData?.coins 
        console.log('Current coins inside fetch', currentCoins)
        return currentCoins
      })
      .then ((currentCoins) => {
        let newCoins = currentCoins + coinsEarned
        console.log('Added coins', newCoins)
        return newCoins 
      })
      .then ((newTotalCoins) => {
        fetch(`${HOST_SERVER}/api/users/coins/` + uid, {
          method: "PUT",
          body: JSON.stringify({ coins: newTotalCoins }),
          headers: {
            "Content-Type": "application/json",
          },
        })
      })
  }


const QuestContextProvider = (props) => {
  const children = props.children;
  const [userData, setUserData] = useState(null);
  const [showCompletedQuests, setShowCompletedQuests] = useState(false)
  const [quest, setQuset] = useState();  // current quest info including checkpoint info
  const [checkPointIndex, setCheckPointIndex] = useState() // quest checkpoint array index
  const [currentCheckPoint, setCurrentCheckPoint] = useState() // checkpoint coordinates at quest.checkPoints[checkPointIndex]
  const [insideGeofence, setInsideGeofence] = useState(false)
  const [completedQuests, setCompletedQuests] = useState([])
  const [completedChecked, setCompletedChecked] = useState(false);
  const [locationChecked, setLocationChecked] = useState(false);
  const authContext = useContext(AuthContext)
  const user = authContext.user;
  const uid = user?.uid;

  
  // console.log("Papa John" , updateUserCoins());

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
        currentQuest = JSON.parse(currentQuest) || { "id": "null" }
        console.log('currentQuest from asyncstorage:', currentQuest)
        setQuset(currentQuest);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const storeCurrentCheckPoint = async (cpData, cpIndexData) => {
    try {
      const cp = JSON.stringify(cpData);
      const cpIndex = JSON.stringify(cpIndexData);
      await AsyncStorage.setItem(CURRENT_CHECKPOINT_KEY, cp);
      await AsyncStorage.setItem(CURRENT_CHECKPOINT_INDEX_KEY, cpIndex);
    } catch (e) {
      // saving error
    }
  }
  const getCurrentCheckPoint = async () => {
    try {
      let cp = await AsyncStorage.getItem(CURRENT_CHECKPOINT_KEY);
      let cpIndex = await AsyncStorage.getItem(CURRENT_CHECKPOINT_INDEX_KEY);

      if (!currentCheckPoint) {
        cp = JSON.parse(cp) || { "id": "51.0447_114.0719", "position": { "latitude": 51.0447, "longitude": 114.0719 } }
        console.log('current checkpoint:', cp)
        setCurrentCheckPoint(cp);
      }
      if (!checkPointIndex) {
        cpIndex = JSON.parse(cpIndex) || 0
        setCheckPointIndex(cpIndex);
      }

    } catch (e) {
      console.log(e);
    }
  }
  const setNextCheckPoint = async () => {
    let nextIndex = checkPointIndex + 1
    storeCurrentCheckPoint(quest.checkPoints[nextIndex], nextIndex)
    setCheckPointIndex(nextIndex)
    setCurrentCheckPoint(quest.checkPoints[nextIndex])
    updateUserCoins(uid, 10)
    // updateFixer()
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
    if (!completedQuests.includes(questId)) {
      const newCompletedQuests = [...completedQuests, questId]
      updateUserCoins(uid, 25)
      console.log("please call this")      
      setCompletedQuests(newCompletedQuests)
    }
  };

  useEffect(() => {
    if (authContext.user) {
      fetch(`${HOST_SERVER}/api/users/` + authContext.user?.uid)
        .then((fetchedData) => fetchedData.json())
        .then((userData) => {
          let userCompletedQuests = userData.completedQuests
          setUserData(userData)
          setCompletedQuests(userCompletedQuests)
          console.log(`MOOOOOOOOOOOOOOOOOO`, userData)
        })
    }
  }, [authContext]);

  const theValues = { userData, setUserData, showCompletedQuests, completedChecked, setCompletedChecked, locationChecked, setLocationChecked, setShowCompletedQuests, completeQuest, completedQuests, setCompletedQuests, quest, selectQuest, insideGeofence, setInsideGeofence, checkPointIndex, currentCheckPoint, setNextCheckPoint };
  if (!quest) {
    return <View><Text>Loading...</Text></View>;
  } else {
    return (
      <QuestContext.Provider value={theValues}>{children}</QuestContext.Provider>
    );
  }
};

module.exports = { QuestContext, QuestContextProvider };
