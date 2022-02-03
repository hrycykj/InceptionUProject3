import { useEffect, useState, useContext } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import * as Location from "expo-location";

import QrScanner from "./QrScanner";
import CheckPointMap from "./CheckPointMap";

import QrCodeChecker from "./QrCodeChecker";
import CheckPointCongratsSplash from "./CheckPointCongratsSplash";
import QuestCompletionSplash from "./QuestCompletionSplash";

import { QuestContext } from "../../context/QuestContext";
import { NotificationContext } from "../../context/NotificationContext";
import {
  setMyLocation,
  updateLocation,
  checkPointIsNear,
} from "./questMapUtil";

const QuestMap = (props) => {
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
  const setInsideGeofence = questContext.setInsideGeofence;

  let { colors } = useTheme();
  let geofenceSize = 10; //metres

  const notificationContext = useContext(NotificationContext);
  const showModal = notificationContext.showModal;

  const fetchQuest = () => {
    setQuest(questContext.quest);
    setCoords(questContext.quest.checkPoints);
  };

  useEffect(() => {
    fetchQuest();
  }, [questContext.quest]);

  useEffect(() => {
    setMyLocation(setLocation, setErrorMsg).catch((error) =>
      console.error(error)
    );
    updateLocation(setLocation).catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    (() => {
      setCheckPoint(null);
      setCheckPointComplete(null);
      setInsideGeofence(false);
    })();
  }, [currentCheckPoint]);
  useEffect(() => {
    checkPointIsNear(
      coords,
      currentCheckPoint,
      location,
      geofenceSize,
      setInsideGeofence
    ).catch((error) => console.error(error));
  }, [location]);

  // useEffect(() => {
  //   if (checkPointComplete && !questComplete) {
  //     showModal(() => {
  //       return (
  //         <CheckPointCongratsSplash
  //           quest={quest}
  //           checkPoint={checkPoint}
  //           currentCheckPoint={currentCheckPoint}
  //           setCurrentCheckPoint={setCurrentCheckPoint}
  //           setCheckPointComplete={setCheckPointComplete}
  //           setQuestComplete={setQuestComplete}
  //         />
  //       );
  //     }, false);
  //   }
  // }, [checkPointComplete]);

  useEffect(() => {
    if (questComplete) {
      showModal(() => {
        return <QuestCompletionSplash />;
      });
    }
  }, [questComplete]);
  return (
    <>
      {location && coords && !checkPointComplete && !questComplete && (
        <>
          <QrScanner
            checkPoint={checkPoint}
            setCheckPoint={setCheckPoint}
            location={location}
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
              ></CheckPointMap>
            </View>
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
          >
            <CheckPointCongratsSplash
              quest={quest}
              checkPoint={checkPoint}
              currentCheckPoint={currentCheckPoint}
              setCurrentCheckPoint={setCurrentCheckPoint}
              setCheckPointComplete={setCheckPointComplete}
              setQuestComplete={setQuestComplete}
            />
          </QrCodeChecker>
        )}
    </>
  );
};

export default QuestMap;
