import { View } from 'react-native'
import {HOST_SERVER} from '../util/hostServer'
import { useEffect, useState } from 'react'
import MappingTest from './MappingTest'

const SelectedQuest = (props) => {
    let questName=props.questName
    let [quest, setQuest] = useState ({})
    let coordinates={latitude: 1, longitude: 1}

    useEffect(() => {
        (async () => {
            let fetchedData = await fetch (`${HOST_SERVER}/api/quest/`+questName)
            fetchedData.json().then ((data)=>{
                setQuest(data)
            })
            // console.log(quest)
        })();
    }, []);
    
    
    if (quest&&quest.checkPoints) {
        // console.log('if',quest)
        coordinates = quest.checkPoints[0].position
    }
    // console.log ('coords',coordinates)

    return(
        <View>
            <MappingTest 
                checkpointCoords = {coordinates}
            />
        </View>
    )
}

export default SelectedQuest