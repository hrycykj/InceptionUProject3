import { View, Text, Image, Button } from 'react-native'
import { useEffect, useState } from 'react'

const CheckPointCongratsSplash = (props) => {
    let quest = props.quest
    let checkPoint = props.checkPoint
    let currentCheckPoint = props.currentCheckPoint
    let setCurrentCheckPoint = props.setCurrentCheckPoint
    let setCheckPointComplete = props.setCheckPointComplete
    let setQuestComplete = props.setQuestComplete
    let [buttonClick, setButtonClick] = useState (null)

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
        <View>
            <Text>{`Congratulations, you've found the ${checkPoint.title}.  ${checkPoint.description}.`}</Text>
            <Image 
                style={{width:'50%', height:'50%'}}
                source={{uri:checkPoint.objectToFind.url}}
            />
            <View
                style={{
                    // position: 'absolute',//use absolute position to show button on top of the map
                    // top: '0%', //for center align
                    alignSelf: 'center', //for align to right
                    margin: 10,
                    padding: 0,
                    borderRadius: 10,
                    width: '30%',
                    borderWidth: 1,
                    backgroundColor: '#fff',
                }}
            >
                <Button
                    onPress={() => {setButtonClick(true)}}
                    title="Fetch Next Checkpoint"
                    accessibilityLabel="Fetch Next Checkpoint"
                    color= "#841584"
                />
            </View>
        </View>
    )
}

export default CheckPointCongratsSplash