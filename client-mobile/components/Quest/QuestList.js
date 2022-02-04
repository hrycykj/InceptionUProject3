import React, { useEffect, useState, useContext } from "react";
import { ScrollView } from "react-native";
import QuestCard from "./QuestCard";
import { HOST_SERVER } from "../../util/hostServer";
import { QuestContext } from "../../context/QuestContext";
import { Modal, Portal, Text, Subheading, Button, Provider, Surface, useTheme } from "react-native-paper";
import QuestModal from "./QuestModal";
import { NotificationContext } from '../../context/NotificationContext'

const QuestList = () => {
  const [quests, setQuests] = useState([]);
  const [modalQuest, setModalQuest] = useState();
  const questContext = useContext(QuestContext);
  const notificationContext = useContext(NotificationContext)
  const currentQuest = questContext.quest;
  const showModal = notificationContext.showModal;

  // const [visible, setVisible] = React.useState(false);
  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
  const handleCardPressed = (quest) => {
    setModalQuest(quest);
    showModal(()=>{
      return <QuestModal quest={quest}/>
    });
  };
  
  const { colors } = useTheme()

  useEffect(() => {
    fetch(`${HOST_SERVER}/api/quest`)
      .then((quest) => quest.json())
      .then((data) => {
        setQuests(data);
      });
  }, []);

  return (
    <>
      <Subheading style={{  //Make Current Quest bar touchable - navigates to Map view
            backgroundColor: colors.background,
            padding: 5,
            textAlign: 'center',}}
          >
            {currentQuest&&`Current quest: ${currentQuest?.title}`}
          </Subheading>
      <ScrollView style={{
          backgroundColor: colors.background,
          marginBottom:32
        }}
      >  
        {quests?.map((quest) => {
          return (
            <QuestCard
              key={quest.id}
              quest={quest}
              handleCardPressed={handleCardPressed}
            >
              Quest List
            </QuestCard>
          );
        })}
      </ScrollView>
    </>
  );
};

const containerStyle = {paddingTop: 16};


export default QuestList;