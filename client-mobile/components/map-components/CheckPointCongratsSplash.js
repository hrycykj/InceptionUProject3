import { View, Image } from 'react-native'
import { Text, Button, useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react'

const CheckPointCongratsSplash = (props) => {
    let quest = props.quest
    let checkPoint = props.checkPoint
    let currentCheckPoint = props.currentCheckPoint
    let setCurrentCheckPoint = props.setCurrentCheckPoint
    let setCheckPointComplete = props.setCheckPointComplete
    let setQuestComplete = props.setQuestComplete
    let [buttonClick, setButtonClick] = useState (null)

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

    return(
        <>
            <Text>{`Congratulations, you've found the ${checkPoint.title}.  ${checkPoint.description}.`}</Text>
            <Image 
                style={{width:'50%', height:'50%'}}
                source={{uri:checkPoint.objectToFind.url}}
            />
            <View
                style={
                    {...defaultTheme}, 
                    // position: 'absolute',//use absolute position to show button on top of the map
                    // top: '0%', //for center align
                    {alignSelf: 'center', //for align to right
                }}
            >
                <Button
                    mode="contained"
                    onPress={() => {setButtonClick(true)}}
                    title="Fetch Next Checkpoint"
                    accessibilityLabel="Fetch Next Checkpoint"
                    color= {defaultTheme.colors.accent}
                >
                <Text>
                    Fetch Next Checkpoint
                </Text>
                </Button>
            </View>
        </>
    )
}

export default CheckPointCongratsSplash