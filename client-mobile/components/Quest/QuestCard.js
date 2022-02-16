import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Paragraph, TouchableRipple, useTheme, Badge } from "react-native-paper";
import { QuestContext } from "../../context/QuestContext";

const QuestCard = ({ quest, handleCardPressed }) => {
  const questContext = useContext(QuestContext);
  const currentQuest = questContext.quest
  const selectQuest = questContext.selectQuest;
  const completedQuest = questContext.questComplete
  const { colors } = useTheme();

  let defaultTheme = useTheme()
  return (
    <>
      <Card elevation={3} style={{...defaultTheme}, styles.card}>
        <Card.Cover source={{ uri: quest.thumbnail_url }} />
        <TouchableRipple
          onPress={() => handleCardPressed(quest)}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <>
            {quest.id === currentQuest.id ?
            <Card.Title title={quest.title + ' (Active)'} subtitle={quest.location} titleStyle={{color: colors.accent}} /> :
            <Card.Title title={quest.title} subtitle={quest.location} />
            }
            <Card.Content>
              <Paragraph>{quest.description}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.button}>
            {/* <Button
              onPress={() => {
                selectQuest(quest.id);
                setModalQuest(quest);
              }}
            >
              START
            </Button> */}
          </Card.Actions>
          </>          
        </TouchableRipple>
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
    marginBottom: 8,
    marginTop: 8,
    marginHorizontal: 8,
  },
});

export default QuestCard;
