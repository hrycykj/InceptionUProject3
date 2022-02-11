import * as Location from "expo-location";
import { useEffect, useState, useContext } from "react";
import { NotificationContext } from "../../context/NotificationContext";


const setMyLocation = async (setLocation, setErrorMsg) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status != "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }
  let location = await Location.getCurrentPositionAsync({});
  // let location = await Location.getLastKnownPositionAsync({})
  setLocation(location);
};

const updateLocation = async (setLocation) => {
  _getLocationAsync = async () => {
    let { status } = await Location.getForegroundPermissionsAsync()
    if (status != "granted") {
      console.log('location permissions not granted yet',status)
      return
    }

    let locations = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (loc) => {
        setLocation(loc);
      }
    );
  };
  _getLocationAsync();
  return () => {
    Location.LocationSubscription();
  };
};
const checkPointIsNear = async (coords, currentCheckPoint, location, geofenceSize, setInsideGeofence) => {
  if(!coords || !location)
    return

  let geofenceCoords = coords[currentCheckPoint].position;
  let userProximity = {
    latitude: location.coords.latitude - geofenceCoords.latitude,
  };
  userProximity.longitude =
    location.coords.longitude - geofenceCoords.longitude;

  userProximity.metres = Math.sqrt(
    (userProximity.latitude * 111111) ** 2 +
      (userProximity.longitude *
        111319.488 *
        Math.cos((location.coords.latitude * Math.PI) / 180)) **
        2
  );
  if (userProximity.metres < geofenceSize) {
    setInsideGeofence(true);
  } else if (userProximity.metres > geofenceSize) {
    setInsideGeofence(false);
  }
};

const handleCheckPointScanned = async (checkPoint, questContext, setCheckPointComplete, notificationContext) =>{

  if(!checkPoint)
    return
  const showSnackBar = notificationContext.showSnackBar;
  const currentCheckPoint = questContext.currentCheckPoint;
  const insideGeofence = questContext.insideGeofence;

  if (insideGeofence && checkPoint.id === currentCheckPoint.id) {
    (() => {
      setCheckPointComplete(true);
      showSnackBar("congratulations you've found the checkpoint", "OK");
    })();
  } else {
    (() => {
      setCheckPointComplete(false);
      showSnackBar(
        "You've either scanned the wrong QR code or are too far away from the checkpoint", "OK"
      );
    })();
  }
}

module.exports = {
  setMyLocation,
  updateLocation,
  checkPointIsNear,
  handleCheckPointScanned
};
