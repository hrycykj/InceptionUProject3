import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { HOST_SERVER } from '../util/hostServer'

//test
const styles = StyleSheet.create({
    container: {
      flex: 1,
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

export default function QrScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);

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
      console.log(data)
    })
    setScanning(false);
  };
  const onScan = () => {
    setScanning(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanning && (
        <Button
          onPress={onScan}
          title="Scan Code"
          color="#841584"
          accessibilityLabel="Scan QR code"
        />
      )}

      {scanning && (
        <>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.scanner}
          >
            <Image
              source={require("../assets/camera_frame.png")}
              style={styles.frame}
            />
          </BarCodeScanner>
        </>
      )}
    </View>
  );
}