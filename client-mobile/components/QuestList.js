import React, { useEffect, useState, useContext } from "react";
import { ScrollView, Text } from "react-native";
import QuestCard from "./QuestCard";
import {HOST_SERVER} from '../util/hostServer'
import { QuestContext } from '../context/QuestContext'
const QuestList = () => {
  const [quests, setQuests] = useState([]);
  const questContext = useContext(QuestContext)
  const currentQuest = questContext.quest

  useEffect(() => {
    fetch(`${HOST_SERVER}/api/quest`)
      .then((quest) => quest.json())
      .then((data) => {
        setQuests(data);
      });
  }, []);
  return (
    <ScrollView>
      <Text>{`Current playing quest is: ${currentQuest?.title}`}</Text>
      {quests?.map((quest) => {
        return (
          <QuestCard key={quest.id} quest={quest}>
            Quest List
          </QuestCard>
        );
      })}
    </ScrollView>
  );
}

export default QuestList