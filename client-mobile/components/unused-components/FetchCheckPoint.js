import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import {HOST_SERVER} from '../../util/hostServer'

const FetchCheckPoint = (props) => {
    let checkPointId=props.checkPointId
    let checkpoint=props.checkpoint
    let setCheckpoint=props.setCheckpoint
    let currentCheckPoint=props.currentCheckPoint
    let [message, setMessage] = useState('Fetching your current checkpoint...')

    console.log ('checkpoint ID: ',checkPointId)

    useEffect(() => {
        (async () => {
            let serverEndpoint = await checkPointId
            let fetchedData = await fetch (`${HOST_SERVER}/api/checkPoint/`+serverEndpoint)
            fetchedData.json().then ((data)=>{
                setCheckpoint(data)
                setMessage('')
            })
            console.log('checkpoint data', await checkpoint)
        })();
    }, [currentCheckPoint]);

    return (
        <View>
            <Text>{message}</Text>
        </View>
    )
}

export default FetchCheckPoint