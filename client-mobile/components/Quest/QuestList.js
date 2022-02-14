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
} from "react-native-paper";
import QuestModal from "./QuestModal";
import { NotificationContext } from "../../context/NotificationContext";



const QuestList = (props) => {
  const [quests, setQuests] = useState([]);
  const [modalQuest, setModalQuest] = useState();
  const questContext = useContext(QuestContext);
  const notificationContext = useContext(NotificationContext);
  const currentQuest = questContext.quest;
  const showModal = notificationContext.showModal;

  // const [visible, setVisible] = React.useState(false);
  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
  const handleCardPressed = (quest) => {
    setModalQuest(quest);
    showModal(() => {
      return <QuestModal quest={quest} jumpTo={props.jumpTo}/>;
    });
  };

  const { colors } = useTheme();

  useEffect(() => {
    fetch(`${HOST_SERVER}/api/quest`)
      .then((quest) => quest.json())
      .then((data) => {
        setQuests(data);
      }).catch(err=>console.error(err));
  }, []);

  return (
      <ScrollView >
        <Searchbar 
          placeholder="Search Quests"          
        />
        <QuestCard
          key={currentQuest.id}
          quest={currentQuest}
          handleCardPressed={handleCardPressed}
        />

        {quests?.map((quest) => {
          return (
            currentQuest.id !== quest.id && (
              <QuestCard
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
