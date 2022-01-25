import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import {HOST_SERVER} from '../../util/hostServer'

const FetchQuest = (props) => {
    let questName=props.questName
    let quest=props.quest
    let setQuest=props.setQuest
    let setCoords=props.setCoords
    let [message, setMessage] = useState('Fetching your Quest...')

    useEffect(() => {
        (async () => {
            let fetchedData = await fetch (`${HOST_SERVER}/api/quest/`+questName)
            fetchedData.json().then ((data)=>{
                setQuest(data)
                setCoords(data.checkPoints)
                setMessage('')
            })
            // console.log('fetched Quest data:', await quest)
        })();
    }, []);

    return (
        <View>
            <Text>{message}</Text>
        </View>
    )
}

export default FetchQuest