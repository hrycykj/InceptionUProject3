import * as Location from "expo-location";


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
  if(!coords)
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

module.exports = {
  setMyLocation,
  updateLocation,
  checkPointIsNear
};
