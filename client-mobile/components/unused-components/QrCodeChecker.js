import { useEffect, useState, useContext } from "react";
import { Text, View } from "react-native";
import CheckPointCongratsSplash from "./CheckPointCongratsSplash";
import { QuestContext } from "../../context/QuestContext";

const QrCodeChecker = (props) => {
  const questContext = useContext(QuestContext);

  let location = props.location;
  let checkPoint = props.checkPoint;
  let setCheckPoint = props.setCheckPoint;
  let setCheckPointComplete = props.setCheckPointComplete;

  let [message, setMessage] = useState("checking QR code");
  let checkPointGeofence = 15000; //metres

  let userProximity = {
    latitude: location.coords.latitude - checkPoint.position.latitude,
  };
  userProximity.longitude =
    location.coords.longitude - checkPoint.position.longitude;

  userProximity.metres = Math.sqrt(
    (userProximity.latitude * 111111) ** 2 +
      (userProximity.longitude *
        111319.488 *
        Math.cos((location.coords.latitude * Math.PI) / 180)) **
        2
  );

  useEffect(() => {
    (() => {
      if (userProximity.metres < checkPointGeofence) {
        (() => {
          setCheckPointComplete(true);
          setMessage("congratulations you've found the checkpoint");
          console.log("QR scan coordinates are close enough to your location!");
        })();
      } else {
        (() => {
          setCheckPointComplete(false);
          setMessage(
            "You've either scanned the wrong QR code or are too far away from the checkpoint"
          );
          console.log("location co-ordinates are too far away");
          alert(
            `You've either scanned the wrong QR code or are too far away from the checkpoint`
          );
        })();
      }
    })();
  }, [checkPoint]);

  // console.log("User proximity: ", userProximity);

  return (
    <>
      {/* {checkPoint.id === questContext.currentCheckPoint.id ? (
        props.children
      ) : (
        <Text>Wrong QR Code</Text>
      )} */}
    {props.children}
    </>
  );
};

export default QrCodeChecker;
