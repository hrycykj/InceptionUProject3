import { useEffect, useState, useContext } from "react";
import { View, Button } from "react-native";
import { useTheme, Text } from "react-native-paper";
import QrScanner from "./QrScanner";
import CheckPointMap from "./CheckPointMap";
import CheckPointCongratsSplash from "./CheckPointCongratsSplash";
import { QuestContext } from "../../context/QuestContext";
import { AuthContext } from "../../firebase/AuthProvider";
import { NotificationContext } from "../../context/NotificationContext";
import {
  setMyLocation,
  updateLocation,
  checkPointIsNear,
  handleCheckPointScanned,
  newCenterCoordinates,
} from "./questMapUtil";
import QuestFlourish from "../QuestFlourishFAB";



const QuestMap = (props) => {
  const notificationContext = useContext(NotificationContext);
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  
  const questContext = useContext(QuestContext);
  const insideGeofence = questContext.insideGeofence;
  const setInsideGeofence = questContext.setInsideGeofence;


  let [location, setLocation] = useState(null);
  let [errorMsg, setErrorMsg] = useState(null);
  let [quest, setQuest] = useState(null);
  let [currentCheckPoint, setCurrentCheckPoint] = useState(
    questContext.checkPointIndex
  );
  let [coords, setCoords] = useState(null);
  let [checkPoint, setCheckPoint] = useState(null);
  let [checkPointComplete, setCheckPointComplete] = useState(null);
  let [questComplete, setQuestComplete] = useState(null);
  const [mapCenter, setMapCenter] = useState ({
    'latitude': 51.0447,
    'longitude': -114.0719,
    'latitudeDelta': 0.0025,
    'longitudeDelta': 0.001,
  })
  const [firstMapCenter, setFirstMapCenter] = useState(true)


  let { colors } = useTheme();
  let geofenceSize = 1000; //metres

  const fetchQuest = () => {
    setQuest(questContext.quest);
    setCoords(questContext.quest.checkPoints);
    setCurrentCheckPoint(questContext.checkPointIndex);
  };
  useEffect(() => {
    setMyLocation(setLocation, setErrorMsg).catch((error) =>
      console.log(error)
    );
    updateLocation(setLocation).catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchQuest();
    setCheckPoint(null);
    setCheckPointComplete(false);
    setQuestComplete(false);
    setFirstMapCenter(true)
  }, [questContext.quest]);

  useEffect(() => {
    (() => {
      setCheckPoint(null);
      setCheckPointComplete(null);
      setInsideGeofence(false);
      checkPointIsNear(
        coords,
        currentCheckPoint,
        location,
        geofenceSize,
        setInsideGeofence
      );
    })();
  }, [currentCheckPoint]);

  useEffect(() => {
    checkPointIsNear(
      coords,
      currentCheckPoint,
      location,
      geofenceSize,
      setInsideGeofence
    ).catch((error) => console.log(error));
  }, [quest,location]);

  useEffect(() => {
    handleCheckPointScanned(
      checkPoint,
      questContext,
      setCheckPointComplete,
      notificationContext
    );
  }, [checkPoint]);

  useEffect(() => {
    // console.log('recentering the first checkpoint', firstMapCenter, currentCheckPoint)
    if (firstMapCenter&&(currentCheckPoint==0)&&coords) {
      newCenterCoordinates(location, coords[currentCheckPoint].position, setMapCenter)
      setFirstMapCenter(false)
    }
  },[location])


  return (
    <>
      {location && coords && !checkPointComplete && !questComplete && (
        <>
        
          <QrScanner
            checkPoint={checkPoint}
            setCheckPoint={setCheckPoint}
            location={location}
            setMapCenter={setMapCenter}
            coords={coords}
          >
            <View
              style={
                !insideGeofence
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
                mapCenter = {mapCenter}
                setMapCenter = {setMapCenter}
              ></CheckPointMap>
            </View>
            {/* </QuestFlourish> */}
          </QrScanner>
          
        </>
      )}
      {!location && <Text>Loading location</Text>}
      {!coords && <Text>Please start a quest</Text>}
      <QuestFlourish />
      {checkPoint?.id === questContext?.currentCheckPoint.id && (
        <CheckPointCongratsSplash
          quest={quest}
          checkPoint={checkPoint}
          currentCheckPoint={currentCheckPoint}
          setCurrentCheckPoint={setCurrentCheckPoint}
          setCheckPointComplete={setCheckPointComplete}
          setQuestComplete={setQuestComplete}
          questComplete = {questComplete}
          jumpTo = {props.jumpTo}
          location = {location}
          coords = {coords}
          setMapCenter = {setMapCenter}
        />
      )}

    </>
  );
};

export default QuestMap;
