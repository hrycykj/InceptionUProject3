import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Text, useTheme} from 'react-native-paper';

const MyLocation = (props) => {
  let location = props.location;
  let setLocation = props.setLocation;
  let errorMsg = props.errorMsg;
  let setErrorMsg = props.setErrorMsg;

  let defaultTheme = useTheme()

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      // let location = await Location.getLastKnownPositionAsync({})
      setLocation(location);
    })();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    // console.log(
    //   location.coords.latitude,
    //   location.coords.longitude,
    //   location.coords.accuracy
    // );
  }
  return (
    <>
      {location ? (
        <>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
          <Text>Accuracy: {location.coords.accuracy}</Text>
        </>
      ) : (
        <Text>{text}</Text>
      )}
    </>
  );
};

export default MyLocation