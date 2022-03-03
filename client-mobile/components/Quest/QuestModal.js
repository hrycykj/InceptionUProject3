import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { Button, Card, Paragraph, List, useTheme, Text, Divider } from "react-native-paper";
import { QuestContext } from "../../context/QuestContext";
import { HOST_SERVER } from "../../util/hostServer";
import { NotificationContext } from '../../context/NotificationContext';
import QuestReviews from "./QuestReviews";

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
  const [loadingCp, setLoadingCp] = useState(true);
  const [tab, setTabe] = useState('Description');
  const { colors } = useTheme();

  const startQuest = () => {
    selectQuest(questDetail)
    hideModal()
    showSnackBar('Adventure awaits in the Rabbit Hole!', 'Hop in', () => { props.jumpTo("map") })
  }
  const continueQuest = () => {
    hideModal()
    props.jumpTo('map')
  }

  const showComfirmDialog = () => {
    Alert.alert(
      "Confirm Quest Selection",
      "Starting a new quest will cause lost progress on any current quests",
      [
        {
          text: "Yes",
          onPress: () => {
            startQuest();
          }
        },
        {
          text: "No",
          onPress: () => {
            console.log("no pressed")
          }
        },
      ]
    );
  };

  let defaultTheme = useTheme()

  useEffect(() => {
    setLoadingCp(true)
    let componentMounted = true
    fetch(`${HOST_SERVER}/api/quest/${quest.id}`)
      .then((quest) => quest.json())
      .then((data) => {
        if (componentMounted) { setQuestDetail(data) }
        setLoadingCp(false)
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
        <Card.Actions style={{ ...defaultTheme }, styles.cardTab}>
          <Button
            labelStyle={styles.cardTabButtonLabel}
            contentStyle={tab === 'Description' ? styles.cardTabButtonContent : ''}
            onPress={() => {
              console.log(tab)
              setTabe('Description')
            }}
          >
            Description
          </Button>
          <Button
            labelStyle={styles.cardTabButtonLabel}
            contentStyle={tab === 'Reviews' ? styles.cardTabButtonContent : ''}
            onPress={() => {
              console.log(tab)
              setTabe('Reviews')
            }}
          >
            Reviews
          </Button>
        </Card.Actions>

        <Card.Content>
          <Divider style={{ paddingTop: 0, marginBottom: 8 }} />
          {tab === 'Description' &&
            <>
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
            </>}
          {tab === 'Reviews' &&
            <>
              <QuestReviews quest={quest} />
            </>}
        </Card.Content>
        <Card.Actions style={{ ...defaultTheme }, styles.button}>
        {tab === 'Description' && <Button
            disabled = {loadingCp}
            loading = {loadingCp}
            onPress={() => {
              if (quest.id === currentQuest.id)
                continueQuest()
              else
                showComfirmDialog()
            }}
            style={{ ...defaultTheme }, { marginRight: 8 }}
          >
            {quest.id === currentQuest.id ? 'CONTINUE' : 'BEGIN'}
          </Button> }
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
  cardTab: {
    justifyContent: 'space-between',
    paddingHorizontal: 56,
    marginBottom: 0,
    paddingBottom: 0,

  },
  cardTabButtonLabel: {
    fontSize: 12,
    color: 'black',
    fontWeight: "400",
    // paddingBottom: 8,
  },
  cardTabButtonContent: {
    borderBottomWidth: 2,
    borderColor: '#3fddc1',
  }
});

export default QuestModal;
