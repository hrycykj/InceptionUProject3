import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Paragraph } from "react-native-paper";
import { QuestContext } from '../context/QuestContext'
const QuestCard = ({ quest }) => {
  const questContext = useContext(QuestContext)
  const selectQuest = questContext.selectQuest

  return (
    <>
      <Card elevation={3} style={styles.card}>
        <Card.Cover source={{ uri: quest.thumbnail_url }} />
        <Card.Title title={quest.title} subtitle={quest.location} />
        <Card.Content>
          <Paragraph>{quest.description}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.button}>
          <Button
            onPress={() => {
             selectQuest(quest.id)
            }}
          >
            START
          </Button>
        </Card.Actions>
      </Card>
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 16,
    marginHorizontal: 8,
  },
});

export default QuestCard;
