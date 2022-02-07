import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Card, Paragraph, List, useTheme } from "react-native-paper";
import { QuestContext } from "../../context/QuestContext";
import { HOST_SERVER } from "../../util/hostServer";
import { NotificationContext } from '../../context/NotificationContext';
import { Alert } from "react-native";

const QuestModal = ({ quest }) => {
  const [questDetail, setQuestDetail] = useState();
  const questContext = useContext(QuestContext);
  const notificationContext = useContext(NotificationContext)
  const selectQuest = questContext.selectQuest;
  const showSnackBar = notificationContext.showSnackBar;
  const hideModal = notificationContext.hideModal;

  const startQuest = () =>{
    selectQuest(questDetail)
    hideModal()
    showSnackBar('Starting Quest', 'OK', ()=>{})
  }

  const showComfirmDialog = () => {
    return Alert.alert(
      "Confirm Quest Selection",
      [
        {
          text: "Yes",
          onPress: () => {
            startQuest();
          }},
        {
          text: "No",
        },
      ]
    );
  };

  let defaultTheme = useTheme()

  useEffect(() => {
    fetch(`${HOST_SERVER}/api/quest/${quest.id}`)
      .then((quest) => quest.json())
      .then((data) => {
        setQuestDetail(data);
      });
  }, []);

  return (
    <ScrollView>
      <Card elevation={0} style={{...defaultTheme}, styles.card}>
        <Card.Cover source={{ uri: quest.thumbnail_url }} />
        <Card.Title title={quest.title} subtitle={quest.location} />
        <Card.Content>
          <Paragraph>{quest.description}</Paragraph>
          <List.Section>
            <List.Subheader style={{...defaultTheme}, { marginTop: 8, paddingVertical: 0 }}>
              Check Points
            </List.Subheader>
            {questDetail?.checkPoints.map((cp) => {
              return (
                  <List.Item
                    key={cp.id}
                    style={{ paddingVertical: 0 }}
                    title={cp.title}
                    description={cp.description}
                    left={() => <List.Icon icon="map-marker-radius" />}
                  />
              );
            })}
          </List.Section>
        </Card.Content>
        <Card.Actions style={{...defaultTheme}, styles.button}>
          <Button
            onPress={() => {
              showComfirmDialog()
            }}
            style={{...defaultTheme}, { marginRight: 8 }}
          >
            BEGIN
          </Button>
          <Button
            onPress={() => {
              hideModal();
            }}
          >
            CANCEL
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
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
    paddingBottom: 8,
  },
});

export default QuestModal;
