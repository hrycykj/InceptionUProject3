import { Button, StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const CheckpointMarker = (props) => {
  let coordinates = {
    latitude: props.latitude,
    longitude: props.longitude,
  };

//   console.log("this is my home!", coordinates);

  return (
    <Marker coordinate={coordinates} title={"Me!"} flat={false} opacity={1} centerOffset={{x: 1, y: -17}}>
        {props.children}
    </Marker>
  );
};

export default CheckpointMarker;