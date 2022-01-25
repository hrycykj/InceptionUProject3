import { useEffect, useState } from 'react'
import { View, Button, Text, Dimensions } from 'react-native'

import FetchQuest from './questing/FetchQuest'
import QuestSplash from './questing/QuestSplash'

const Quest = (props) => {
    let [location, setLocation] = useState({'coords.latitude': 51.0447,
        'coords.longitude': 114.0719})
    let [quest, setQuest] = useState ({})
    
    let questName = props.questName

    return (
        <View>
            <FetchQuest 
                questName = "Downtown Tour Calgary"
                quest={quest}
                setQuest={setQuest}
            />
            <QuestSplash />
            {/* wait for user to press start button */}
            {/* <MyLocation /> */}
            {/* <CentreMapview /> */}
            {/* monitor and update user's location on map */}
            {/* check if location falls within checkpoint's geofence */}
            {/* <CheckpointIsNear /> */}
            {/* monitor for user pressing QR scanner button */}
            {/* <QrScanner /> */}
            {/* confirm Qr code returns coordinates of checkpoint and location is within checkpoint geofence */}
            {/* <CheckpointCongratsSplash /> */}
            {/* check if quest is finished */}
            {/* <QuestCompletionSplash /> only if last checkpoint */}
            {/* <NewCheckpoint /> if more checkpoints, update to next checkpoint */}
        </View>
    )
}

export default Quest

