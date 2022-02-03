import { View, Image, ScrollView, StyleSheet } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { Text, Card, Paragraph, Lists, Button, useTheme } from 'react-native-paper'
import { NotificationContext } from '../../context/NotificationContext'

const CheckPointCongratsSplash = (props) => {
    let quest = props.quest
    let checkPoint = props.checkPoint
    let currentCheckPoint = props.currentCheckPoint
    let setCurrentCheckPoint = props.setCurrentCheckPoint
    let setCheckPointComplete = props.setCheckPointComplete
    let setQuestComplete = props.setQuestComplete
    let [buttonClick, setButtonClick] = useState (null)
    const notificationContext = useContext(NotificationContext)
    const hideModal = notificationContext.hideModal;

    let defaultTheme = useTheme()

    useEffect(() => {
        if (((quest.checkPoints.length-1)==currentCheckPoint)&&buttonClick) {
            (()=>{
                setQuestComplete(true)
                console.log('all checkpoints are complete, quest is complete')
            })()
        } else if (buttonClick) {
            (()=>{
                let revisedCheckPoint = (() => {return currentCheckPoint+1})()
                setCurrentCheckPoint (revisedCheckPoint)
                console.log('revised checkpoint',revisedCheckPoint)
                console.log('next checkpoint:',currentCheckPoint)
                
            })()    
        }
    }, [buttonClick]);

    return (
        <ScrollView>
          <Card elevation={3} style={{...defaultTheme},styles.card}>
            <Card.Cover source={{ uri: checkPoint.objectToFind.url }} />
            <Card.Title title={checkPoint.title}  />
            <Card.Content>
                <Paragraph>{`Congratulations, you've found the ${checkPoint.title}.`}</Paragraph>
              <Paragraph>{checkPoint.description}</Paragraph>
              
            </Card.Content>
            <Card.Actions style={styles.button}>
              <Button
                // mode="contained"
                onPress={() => {
                    setButtonClick(true)
                    hideModal()
                }}
                style={{...defaultTheme},{ marginRight: 8 }}
              >
                Next Check Point
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
        marginVertical: '50%',
        marginHorizontal: 8,
        paddingBottom: 8,
      },
    });

    

export default CheckPointCongratsSplash