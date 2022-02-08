import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { Button, Card, Paragraph, List, useTheme } from "react-native-paper";
import { QuestContext } from "../../context/QuestContext";
import { HOST_SERVER } from "../../util/hostServer";
import { NotificationContext } from '../../context/NotificationContext';

const QuestModal = (props) => {
  const quest = props.quest
  const [questDetail, setQuestDetail] = useState();
  const questContext = useContext(QuestContext);
  const notificationContext = useContext(NotificationContext)
  const selectQuest = questContext.selectQuest;
  const currentQuest = questContext.quest;
  const currentCheckPointIndex = questContext.checkPointIndex;
  const showSnackBar = notificationContext.showSnackBar;
  const hideModal = notificationContext.hideModal;
  const { colors } = useTheme();

  const startQuest = () => {
    selectQuest(questDetail)
    hideModal()
    showSnackBar('Starting Quest', 'OK', () => { props.jumpTo("map") })
  }
  const continueQuest = () => {
    hideModal()
    props.jumpTo('map')
  }

  const showComfirmDialog = () => {
    Alert.alert(
      "Confirm Quest Selection",
      "Test",
      [
        {
          text: "Yes",
          onPress: () => {
            startQuest();
          }},
        {
          text: "No",
          onPress: () => {
            console.log ("no pressed")
          }
        },
      ]
    );
  };

  let defaultTheme = useTheme()

  useEffect(() => {
      let componentMounted = true
        fetch(`${HOST_SERVER}/api/quest/${quest.id}`)
        .then((quest) => quest.json())
        .then((data) => {
          if (componentMounted) {setQuestDetail(data)}
        });
      return () => {
        componentMounted = false
      } 
  }, []);

  return (
    <ScrollView>
      <Card elevation={0} style={{ ...defaultTheme }, styles.card}>
        <Card.Cover source={{ uri: quest.thumbnail_url }} />
        {quest.id === currentQuest.id ?
          <Card.Title title={quest.title + ' (Active)'} subtitle={quest.location} titleStyle={{ color: colors.accent }} /> :
          <Card.Title title={quest.title} subtitle={quest.location} />
        }
        <Card.Content>
          <Paragraph>{quest.description}</Paragraph>
          <List.Section>
            <List.Subheader style={{ ...defaultTheme }, { marginTop: 8, paddingVertical: 0 }}>
              Check Points
            </List.Subheader>
            {questDetail?.checkPoints.map((cp, i) => {
              return (
                quest.id === currentQuest.id ?
                  <List.Item
                    key={cp.id}
                    style={{ paddingVertical: 0 }}
                    titleStyle={currentCheckPointIndex > i ? { color: colors.accent } : {}}
                    title={cp.title}
                    description={cp.description}
                    left={() => <List.Icon icon="map-marker-radius" color={currentCheckPointIndex > i ? colors.accent : ''} />}
                  /> :
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
        <Card.Actions style={{ ...defaultTheme }, styles.button}>
          <Button
            onPress={() => {
              showComfirmDialog()
            }}
            style={{ ...defaultTheme }, { marginRight: 8 }}
          >
            {quest.id === currentQuest.id ? 'CONTINUE' : 'BEGIN'}
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
