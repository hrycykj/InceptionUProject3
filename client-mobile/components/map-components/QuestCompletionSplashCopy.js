import React, { useState, useContext } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import QuestList from "../Quest/QuestList";
import { NotificationContext } from "../../context/NotificationContext"
import {QuestContext} from "../../context/QuestContext"


const QuestCompletionSplash  = (props) => {
  const [modalVisible, setModalVisible] = useState(true);
  const quest = props.quest;
  const jumpTo = props.jumpTo;
  const notificationContext = useContext(NotificationContext)
  const questContext = useContext(QuestContext)


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        //   setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>CONGRATULATIONS - You've completed the quest!</Text>
            <Text>{quest?.completionStory}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                // setModalVisible(false)
                questContext.resetQuest()
                notificationContext.hideModal()
                jumpTo("quest")}
              }
              
              >
              <Text style={styles.textStyle}>Go on another adventure</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
      marginTop: 25,
    borderRadius:50,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    padding:4,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center"
  }
});

export default QuestCompletionSplash ;