import { useEffect } from 'react'
import { View, Text } from 'react-native'

const CheckPointIsNear = (props) => {
    let location=props.location
    let geofenceCoords=props.geofenceCoords // latitude and longitude of centre of geofence
    let geofenceSize = props.geofenceSize // radius of geofence in metres
    let setInsideGeofence = props.setInsideGeofence

    // console.log("CheckPointIsNear checkpoint coords:", geofenceCoords)

    let userProximity = {latitude: (location.coords.latitude-geofenceCoords.latitude)}
    userProximity.longitude = location.coords.longitude-geofenceCoords.longitude

    userProximity.metres = Math.sqrt(((userProximity.latitude*111111)**2)
                                    +((userProximity.longitude* 111319.488*
                                        Math.cos(location.coords.latitude*Math.PI/180))**2))


    useEffect(() => {
          (async () => {
            console.log('hi from geofencing-r-us')
            if (userProximity.metres<geofenceSize) {
                console.log(`within ${geofenceSize} metre geofence (user proximity = ${userProximity.metres})`)
                setInsideGeofence(true)
                // alert(`within the ${geofenceSize} metre checkpoint geofence!`); // alerts every time location changes within the geofence
            }
            else if (userProximity.metres>geofenceSize) {
                console.log('outside the geofence')
                setInsideGeofence(false)
            }
        })()
    }, [location])

    return (
        <View>
            <Text>Component to test if location falls within checkpoint geofence</Text>
        </View>
    )
}

export default CheckPointIsNear