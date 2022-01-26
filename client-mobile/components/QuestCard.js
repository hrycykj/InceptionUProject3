import React from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Paragraph } from "react-native-paper";

const QuestCard = ({ quest }) => {
  console.log(quest);
  return (
    <>
      <Card elevation={3} style={styles.card}>
        <Card.Cover source={{ uri: quest.thumbnail_url }} />
        <Card.Title title={quest.title} subtitle={quest.location} />
        <Card.Content>
          <Paragraph>{quest.description}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.button}>
          <Button onPress={()=>{console.log('Button pressed')}}>View</Button>
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
    marginHorizontal: 8
  },
});

export default QuestCard;
