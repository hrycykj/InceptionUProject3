import { useEffect } from 'react'
import { View, Text } from 'react-native'
import * as Location from 'expo-location'

const LocationUpdate = (props) => {
    let location= props.location
    let setLocation= props.setLocation
    let questComplete= props.questComplete

    useEffect(() => {
        console.log('hi')
        _getLocationAsync = async () => {
            let locations = await Location.watchPositionAsync(
                { accuracy: Location.Accuracy.Highest, timeInterval: 1000, distanceInterval: 1 },
                (loc) => {
                    setLocation(loc)
                    // console.log('ongoing location info: ',loc)
                }
            )
        }
        _getLocationAsync()
    }, [])

    return (
        <View>
            <Text>Moving...</Text>
        </View>
    )
}

export default LocationUpdate