import { useEffect, useState, useContext } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper"

import FetchQuest from './FetchQuest'
import QuestSplash from './QuestSplash'
import MyLocation from './mapping/MyLocation'
import QrScanner from './QrScanner'
import CheckPointMap from './CheckPointMap'
import LocationUpdate from './mapping/LocationUpdate'
import CheckPointIsNear from './CheckPointIsNear'
import QrCodeChecker from './QrCodeChecker'
import CheckPointCongratsSplash from './CheckPointCongratsSplash'
import QuestCompletionSplash from './QuestCompletionSplash'

import { QuestContext } from "../../context/QuestContext"
import { NotificationContext } from "../../context/NotificationContext";

const Quest = (props) => {
  let [location, setLocation] = useState(null);
  let [errorMsg, setErrorMsg] = useState(null);
  let [quest, setQuest] = useState(null);
  let [currentCheckPoint, setCurrentCheckPoint] = useState(
    props.checkPoint || 0
  );
  let [coords, setCoords] = useState(null);
  let [checkPoint, setCheckPoint] = useState(null);
  let [checkPointComplete, setCheckPointComplete] = useState(null);
  let [questComplete, setQuestComplete] = useState(null);
 
  const questContext = useContext(QuestContext);
  const insideGeofence = questContext.insideGeofence;
  const setInsideGeofence = questContext.setInsideGeofence

  let questName = props.questName;
  let { colors } = useTheme()
  let geofenceSize = 10; //metres
  
  const notificationContext = useContext(NotificationContext);
  const showModal = notificationContext.showModal;

  // if (checkPoint){
  //     console.log('checkPoint data returned',checkPoint)
  // }

  useEffect(() => {
    (() => {
      setCheckPoint(null);
      setCheckPointComplete(null);
      setInsideGeofence(false);
    })();
  }, [currentCheckPoint]);

  useEffect(() => {
    if (checkPointComplete && !questComplete) {
      showModal(() => {
        return (
          <CheckPointCongratsSplash
            quest={quest}
            checkPoint={checkPoint}
            currentCheckPoint={currentCheckPoint}
            setCurrentCheckPoint={setCurrentCheckPoint}
            setCheckPointComplete={setCheckPointComplete}
            setQuestComplete={setQuestComplete}
          />
        );
      });
    }
  }, [checkPointComplete]);

  useEffect(() => {
    if (questComplete) {
      showModal(() => {
        return <QuestCompletionSplash />;
      });
    }
  }, [questComplete]);

  return (
    <>
      {!quest && (
        <FetchQuest
          questName={questName}
          quest={quest}
          setQuest={setQuest}
          setCoords={setCoords}
        />
      )}
      <QuestSplash />
      {/* wait for user to press start button inside QuestSplash*/}
      <MyLocation
        location={location}
        setLocation={setLocation}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
      />
      {/* {(location) && <Text>{errorMsg}</Text>} */}
      {location && coords && !checkPointComplete && !questComplete && (
        <>
          <QrScanner
            checkPoint={checkPoint}
            setCheckPoint={setCheckPoint}
            location={location}
          >
            <View
              style={
                (!insideGeofence)
                  ? {
                      borderLeftWidth: 10,
                      borderRightWidth: 10,
                      borderColor: colors.primary,
                    }
                  : {
                      borderLeftWidth: 10,
                      borderRightWidth: 10,
                      borderColor: colors.accent,
                    }
              }
            >
              <CheckPointMap
                myLocation={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                checkPointLocation={coords[currentCheckPoint].position} // {{'latitude': 51.0724839955983, 'longitude': -114.20429068730083}}      // {coords[currentCheckPoint].position}
              ></CheckPointMap>
            </View>
            <LocationUpdate
              location={location}
              setLocation={setLocation}
              questComplete={questComplete}
            />
            <CheckPointIsNear
              location={location}
              geofenceCoords={coords[currentCheckPoint].position} // {{'latitude': 51.0724839955983, 'longitude': -114.20429068730083}}   //{coords[currentCheckPoint].position}
              geofenceSize={geofenceSize}
              setInsideGeofence={setInsideGeofence}
            />
          </QrScanner>
        </>
      )}

      {checkPoint &&
        location && ( // confirm Qr code returns coordinates of checkpoint and location is within checkpoint geofence
          <QrCodeChecker
            location={location}
            checkPoint={checkPoint}
            setCheckPoint={setCheckPoint}
            setCheckPointComplete={setCheckPointComplete}
          />
        )}
    </>
  );
};

export default Quest;
