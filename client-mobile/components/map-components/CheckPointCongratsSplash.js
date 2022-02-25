import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  RecyclerViewBackedScrollViewBase,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import {
  Text,
  Card,
  Paragraph,
  Lists,
  Button,
  useTheme,
  ProgressBar,
} from "react-native-paper";
import { NotificationContext } from "../../context/NotificationContext";
import { QuestContext } from "../../context/QuestContext";
import QuestCompletionSplashCopy from "./QuestCompletionSplashCopy";
import { AuthContext } from "../../firebase/AuthProvider";
import CoinToss from "../coins-component/CoinToss";
import CoinTossCopy from "../coins-component/CoinTossCopy";
import { HOST_SERVER } from "../../util/hostServer";

const CheckPointCongratsSplash = (props) => {
  let quest = props.quest;
  let checkPoint = props.checkPoint;
  let currentCheckPoint = props.currentCheckPoint;
  let setCurrentCheckPoint = props.setCurrentCheckPoint;
  let setCheckPointComplete = props.setCheckPointComplete;
  let setQuestComplete = props.setQuestComplete;
  let questComplete = props.questComplete;
  let [buttonClick, setButtonClick] = useState(null);

  const notificationContext = useContext(NotificationContext);
  const questContext = useContext(QuestContext);

  const authContext = useContext(AuthContext);
  const user = authContext.user;

  let defaultTheme = useTheme();
  const { colors } = useTheme();

  const handleNextButtonClicked = () => {
    console.log("inside the handleNextbuttonClicked function")
    if (quest.checkPoints.length - 1 == currentCheckPoint) {
      setQuestComplete(true);
      questContext.completeQuest(quest.id);

      notificationContext.showModal(() => {
        return <QuestCompletionSplashCopy quest={quest} jumpTo={props.jumpTo} />
      });
    } else {
      let revisedCheckPoint = currentCheckPoint + 1;
      setCurrentCheckPoint(revisedCheckPoint);
      console.log("revised checkpoint", revisedCheckPoint);
      console.log("next checkpoint:", currentCheckPoint);
      questContext.setNextCheckPoint();
    }
  };

  useEffect(() => {
    console.log("THIS IS THE UPDATE COINS USEEFFECT!!", user.uid);
    fetch(`${HOST_SERVER}/api/users/coins/` + user.uid, {
      method: "PUT",
      body: JSON.stringify({ coins: 15 }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((ex) => console.log(`fetch failed: ${ex.message}`));
  }, [questComplete]);

  useEffect(() => {
    console.log(
      "MADE IT INTO quest complete USEEFFECT!!",
      quest.id,
      questComplete,
    );
    if (questComplete) {
    fetch(`${HOST_SERVER}/api/users/completedQuest/` + user.uid, {
      method: "PUT",
      body: JSON.stringify({ completedQuest: quest.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
      setQuestComplete(req);
        console.log(response);
      })
      .catch((ex) => console.log(`fetch failed: ${ex.message}`))
     .then(() => setQuestComplete(null));
    }
  }, [questComplete]);

  return (
    <ScrollView>
      <Card elevation={3} style={{ ...defaultTheme, ...styles.card, zIndex: 10 } } >
        <Card.Cover source={{ uri: checkPoint.objectToFind.url }} />
        <Card.Title title={checkPoint.title} />
        <Card.Content>
          <Paragraph>{`Congratulations, you've found the ${checkPoint.title}.`}</Paragraph>
          <Paragraph>{checkPoint.description}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.button}>
          <Button
            // mode="contained"
            onPress={() => {
              console.log('boo')
              handleNextButtonClicked();
            }}
            style={({ ...defaultTheme }, { marginRight: 8 })}
          >
            {currentCheckPoint === quest.checkPoints.length - 1
              ? "Complete"
              : "Next Check Point"}
          </Button>
        </Card.Actions>
        <ProgressBar
          progress={(currentCheckPoint + 1) / quest.checkPoints.length}
          color={colors.accent}
        />
        {/* <CoinToss /> */}
      </Card>
        <CoinTossCopy />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
  },
  card: {
    marginVertical: "50%",
    marginHorizontal: 8,
    paddingBottom: 0,
  },
});

export default CheckPointCongratsSplash;
