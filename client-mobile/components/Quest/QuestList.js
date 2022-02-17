import React, { useEffect, useState, useContext } from "react";
import { ScrollView, View } from "react-native";
import QuestCard from "./QuestCard";
import { HOST_SERVER } from "../../util/hostServer";
import { QuestContext } from "../../context/QuestContext";
import {
  Modal,
  Portal,
  Text,
  Subheading,
  Button,
  Provider,
  useTheme,
  Searchbar,
  defaultTheme,
  RadioButton,
} from "react-native-paper";
import QuestModal from "./QuestModal";
import { NotificationContext } from "../../context/NotificationContext";
import QuestFilter from "./QuestFilter";

const QuestList = (props) => {
  const [quests, setQuests] = useState([]);
  const [modalQuest, setModalQuest] = useState();
  const questContext = useContext(QuestContext);
  const currentQuest = questContext.quest;
  const userCompletedQuests = questContext.completedQuests || ['']
  const showCompletedQuests = questContext.showCompletedQuests
  const notificationContext = useContext(NotificationContext);
  const showModal = notificationContext.showModal;
  const [checked, setChecked] = React.useState('first');
  const defaultTheme = useTheme();

  // const [visible, setVisible] = React.useState(false);
  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
  const handleCardPressed = (quest) => {
    setModalQuest(quest);
    showModal(() => {
      return <QuestModal quest={quest} jumpTo={props.jumpTo} />;
    });
  };

  const handleFilterPressed = () => {
    console.log("Filter has been activated")
   
    showModal(() => {
      
    return (
      <QuestFilter 
        checked = {checked}
        setChecked = {setChecked}
      />     
       )})
}

  const { colors } = useTheme();

  useEffect(() => {
    fetch(`${HOST_SERVER}/api/quest`)
      .then((quest) => quest.json())
      .then((data) => {
        setQuests(data);
      }).catch(err => console.error(err));
  }, []);

  return (
    <ScrollView >
      <Searchbar />

      <View style={{ ...defaultTheme }}>

        <Button icon="filter" mode="contained" onPress={() => handleFilterPressed()}>
          Filters
        </Button>
      </View>
      {currentQuest?.title &&  // make sure there is data to pull from asyncStorage before displaying the current quest
        <QuestCard
          key={currentQuest.id}
          quest={currentQuest}
          handleCardPressed={handleCardPressed}
        />
      }

      {quests?.map((quest) => {
        return (
          currentQuest.id !== quest.id &&
          (userCompletedQuests.includes(quest.id)
            ? (showCompletedQuests) &&
            <QuestCard
              key={quest.id}
              quest={quest}
              handleCardPressed={handleCardPressed}
            />
            : <QuestCard
              key={quest.id}
              quest={quest}
              handleCardPressed={handleCardPressed}
            />
          )
        );
      })}
    </ScrollView>
  );
};

const containerStyle = { paddingTop: 16 };

export default QuestList;
