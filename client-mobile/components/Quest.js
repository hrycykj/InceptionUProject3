import { useEffect, useState } from 'react'
import { View, Button, Text, Dimensions } from 'react-native'

import FetchQuest from './questing/FetchQuest'
import QuestSplash from './questing/QuestSplash'
import MyLocation from './mapping/MyLocation'
import QrScanner from './QrScanner'
import CheckPointMap from './questing/CheckPointMap'
import QrCodeChecker from './questing/QrCodeChecker'

const Quest = (props) => {
    let [location, setLocation] = useState(null)
    let [errorMsg, setErrorMsg] = useState(null)
    let [quest, setQuest] = useState (null)
    let [currentCheckPoint, setCurrentCheckPoint] = useState(props.checkPoint || 0)
    let [coords, setCoords] = useState(null)
    let [checkPoint, setCheckPoint] = useState(null)
    
    let questName = props.questName

    if (checkPoint){
        console.log('checkPoint data returned',checkPoint)
    }

    // useEffect(() => {
    //     (async () =>{
    //             let b = await currentCheckPoint
    //             let a = await quest
    //             a.then (async (data) => {
    //                 console.log('a: ',data)
    //             })
    //             // console.log ('coordinates: ', await a[b].position)
    //     })();
    // }, []);

    return (
        <>
            <FetchQuest 
                questName={questName}
                quest={quest}
                setQuest={setQuest}
                setCoords={setCoords}
            />
            <QuestSplash />
            {/* wait for user to press start button inside QuestSplash*/}
            <MyLocation 
                location = {location}
                setLocation = {setLocation}
                errorMsg = {errorMsg}
                setErrorMsg = {setErrorMsg}
            />
            {/* {(location) && <Text>{errorMsg}</Text>} */}
            {(location&&coords) && 
                (<>
                    <QrScanner
                        checkPoint = {checkPoint}
                        setCheckPoint = {setCheckPoint}
                        location = {location}
                    >
                        <CheckPointMap
                            myLocation= {{latitude: location.coords.latitude, longitude: location.coords.longitude}} 
                            checkPointLocation= {coords[currentCheckPoint].position}
                        >
                        </CheckPointMap>
                    </QrScanner>
                </>)   
            }
            {/* monitor and update user's location on map */}
            {/* check if location falls within checkpoint's geofence */}
            {/* <CheckpointIsNear /> */}
            {/* confirm Qr code returns coordinates of checkpoint and location is within checkpoint geofence */}
            {(checkPoint&&location) &&
                <QrCodeChecker 
                    location = {location}
                    checkPoint = {checkPoint}
                />
            }

            {/* <CheckpointCongratsSplash /> */}
            {/* check if quest is finished */}
            {/* <QuestCompletionSplash /> only if last checkpoint */}
            {/* <NewCheckpoint /> if more checkpoints, update to next checkpoint */}
        </>
    )
}

export default Quest

