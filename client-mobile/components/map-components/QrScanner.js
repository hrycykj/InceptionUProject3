import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Text, Button, useTheme, DefaultTheme } from 'react-native-paper'
import { BarCodeScanner } from "expo-barcode-scanner";
import { HOST_SERVER } from '../../util/hostServer'

//test
const styles = StyleSheet.create({
    container: {
      flex: 5,
      flexDirection: "column",
      justifyContent: "center",
    },
    frame: {
      width: "70%",
      height: (Dimensions.get("window").width * 7) / 10,
    },
    scanner: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default function QrScanner(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);
  let checkPoint = props.checkPoint
  let setCheckPoint = props.setCheckPoint
  let location = location

  let defaultTheme = useTheme()

  console.log('inside the QrScanner component', scanning)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    fetch(`${data}`).then(res=>res.json()).then(data=>{
      setCheckPoint(data)
    })
    setScanning(false);
  };
  const onScan = () => {
    setScanning(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permissions</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
    <View style={{...defaultTheme}, styles.container}>
      {props.children}
      {!scanning && (
        <View
          style={
            {...defaultTheme}, 
            {
              position: 'absolute',//use absolute position to show button on top of the map
              top: '0%', //for center align
              alignSelf: 'center', //for align to right
            }
          }
        >
          <Button
            mode="contained"
            onPress={onScan}
            title="Scan Code"
            accessibilityLabel="Scan QR code"
            color= {defaultTheme.colors.accent}
          >
            Scan Code
          </Button>
        </View>
      )}

      {scanning && (
        <>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={{...defaultTheme}, styles.scanner}
          >
            <Image
              source={require("../../assets/camera_frame.png")}
              style={{...defaultTheme}, styles.frame}
            />
          </BarCodeScanner>
        </>
      )}
    </View>
    </>
  );
}