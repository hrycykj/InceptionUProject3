import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import QuestCard from "./QuestCard";
import {HOST_SERVER} from '../util/hostServer'

const QuestList = () => {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    fetch(`${HOST_SERVER}/api/quest`)
      .then((quest) => quest.json())
      .then((data) => {
        setQuests(data);
      });
  }, []);
  return (
    <ScrollView>
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