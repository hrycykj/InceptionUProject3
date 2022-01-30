import { useEffect, useState } from 'react'
import { View, Button, Text, Dimensions } from 'react-native'

import FetchQuest from './questing/FetchQuest'
import QuestSplash from './questing/QuestSplash'
import MyLocation from './mapping/MyLocation'
import QrScanner from './questing/QrScanner'
import CheckPointMap from './questing/CheckPointMap'
import LocationUpdate from './mapping/LocationUpdate'
import CheckPointIsNear from './questing/CheckPointIsNear'
import QrCodeChecker from './questing/QrCodeChecker'
import CheckPointCongratsSplash from './questing/CheckPointCongratsSplash'
import QuestCompletionSplash from './questing/QuestCompletionSplash'

const Quest = (props) => {
    let [location, setLocation] = useState(null)
    let [errorMsg, setErrorMsg] = useState(null)
    let [quest, setQuest] = useState (null)
    let [currentCheckPoint, setCurrentCheckPoint] = useState(props.checkPoint || 0)
    let [coords, setCoords] = useState(null)
    let [checkPoint, setCheckPoint] = useState(null)
    let [checkPointComplete, setCheckPointComplete] = useState(null)
    let [questComplete, setQuestComplete] = useState(null)
    let [insideGeofence, setInsideGeofence] = useState(false)
    
    let questName = props.questName
    let geofenceSize = 10 //metres

    // if (checkPoint){
    //     console.log('checkPoint data returned',checkPoint)
    // }

    useEffect(() => {
        (()=>{
                setCheckPoint(null)
                setCheckPointComplete (null)
                setInsideGeofence(false)     
        })()
    }, [currentCheckPoint]);

    return (
        <>
            {!quest && 
                <FetchQuest 
                    questName={questName}
                    quest={quest}
                    setQuest={setQuest}
                    setCoords={setCoords}
                />}
            <QuestSplash />
            {/* wait for user to press start button inside QuestSplash*/}
            <MyLocation 
                location = {location}
                setLocation = {setLocation}
                errorMsg = {errorMsg}
                setErrorMsg = {setErrorMsg}
            />
            {/* {(location) && <Text>{errorMsg}</Text>} */}
            {(location&&coords&&!checkPointComplete&&!questComplete) && 
                (<>
                    <QrScanner
                        checkPoint = {checkPoint}
                        setCheckPoint = {setCheckPoint}
                        location = {location}
                    >

                        <View
                            style = {
                                (!insideGeofence)
                                    ? {
                                        borderLeftWidth: 10,
                                        borderRightWidth: 10,
                                        borderColor: '#ff0000'
                                    }
                                    : {
                                        borderLeftWidth: 10,
                                        borderRightWidth: 10,
                                        borderColor: '#00ff00'   
                                    }
                                }
                        >
                            <CheckPointMap
                                 
                                myLocation= {{latitude: location.coords.latitude, longitude: location.coords.longitude}} 
                                checkPointLocation= {coords[currentCheckPoint].position} // {{'latitude': 51.0724839955983, 'longitude': -114.20429068730083}}      // {coords[currentCheckPoint].position}
                            >
                            </CheckPointMap>
                        </View>
                        <LocationUpdate
                            location = {location}
                            setLocation = {setLocation}
                            questComplete = {questComplete}
                        />
                        <CheckPointIsNear 
                            location = {location}
                            geofenceCoords= {coords[currentCheckPoint].position} // {{'latitude': 51.0724839955983, 'longitude': -114.20429068730083}}   //{coords[currentCheckPoint].position}
                            geofenceSize = {geofenceSize}
                            setInsideGeofence = {setInsideGeofence}
                        />
                    </QrScanner>
                </>)   
            }
            
            {(checkPoint&&location) && // confirm Qr code returns coordinates of checkpoint and location is within checkpoint geofence
                <QrCodeChecker 
                    location = {location}
                    checkPoint = {checkPoint}
                    setCheckPoint = {setCheckPoint}
                    setCheckPointComplete = {setCheckPointComplete}
                />
            }

            {(checkPointComplete&&!questComplete) && // check if quest is finished and if more checkpoints, update to next checkpoint
                <CheckPointCongratsSplash 
                    quest = {quest}
                    checkPoint = {checkPoint}
                    currentCheckPoint = {currentCheckPoint}
                    setCurrentCheckPoint = {setCurrentCheckPoint}
                    setCheckPointComplete = {setCheckPointComplete}
                    setQuestComplete = {setQuestComplete}
                />
            }
            {(questComplete) && 
                <QuestCompletionSplash />
            }
        </>
    )
}

export default Quest

