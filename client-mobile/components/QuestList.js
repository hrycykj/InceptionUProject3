import React, { useEffect, useState, useContext } from "react";
import { ScrollView } from "react-native";
import QuestCard from "./QuestCard";
import { HOST_SERVER } from "../util/hostServer";
import { QuestContext } from "../context/QuestContext";
import { Modal, Portal, Text, Subheading, Button, Provider, Surface, useTheme } from "react-native-paper";
import QuestModal from "./QuestModal";

const QuestList = () => {
  const [quests, setQuests] = useState([]);
  const [modalQuest, setModalQuest] = useState();
  const questContext = useContext(QuestContext);
  const currentQuest = questContext.quest;
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const handleCardPressed = (quest) => {
    setModalQuest(quest);
    showModal();
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
            backgroundColor: colors.primary,
            padding: 5,
            textAlign: 'center',}}
          >
            {currentQuest&&`Current quest: ${currentQuest?.title}`}
          </Subheading>
      <ScrollView style={{
          backgroundColor: colors.primary,
        }}
      >  
        <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <QuestModal quest={modalQuest} hideModal={hideModal}/>
            </Modal>
        </Portal>

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
