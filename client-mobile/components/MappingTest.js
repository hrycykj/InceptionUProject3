import { Button, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from "react-native-safe-area-context"
import {useState} from 'react'

import MyLocation from './mapping/MyLocation'
import CurrentMapview from './mapping/CurrentMapview'
import CheckpointMarker from './mapping/CheckpointMarker'
import CentreMapview from './mapping/CentreMapview'

const MappingTest = (props) => {

    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);

    const checkpointCoords=props.checkpointCoords

    return (
        <View style={styles.container}>
        <SafeAreaView>
            <View>
                <Text>The Mapping Test Component</Text>
                <MyLocation 
                    location = {location}
                    setLocation = {setLocation}
                    errorMsg = {errorMsg}
                    setErrorMsg = {setErrorMsg}
                />
            </View>
            <View>
                {/* <View>
                    {(location) && 
                        <CurrentMapview
                        latitude= {location.coords.latitude} 
                        longitude= {location.coords.longitude}
                        latitudeDelta= {location.coords.accuracy*30/111111}
                        longitudeDelta= {location.coords.accuracy*1/111111}
                        >
                            <CheckpointMarker
                            latitude= {location.coords.latitude}
                            longitude= {location.coords.longitude}
                            >
                                <Image source={require('../assets/Pin_Trans.png')}
                                    style={{
                                    height: 45, width: 35,
                                    // tintColor: '#fff'
                                    }}
                                />
                            </CheckpointMarker>
                        </CurrentMapview>
                    }
                </View> */}
                <View>
                    {(location) && 
                        <CentreMapview
                            coords1= {{latitude: location.coords.latitude, longitude: location.coords.longitude}} 
                            coords2= {checkpointCoords}
                        >
                            <CheckpointMarker
                                latitude= {location.coords.latitude}
                                longitude= {location.coords.longitude}
                            >
                                <Image source={require('../assets/Pin_Trans.png')}
                                    style={{
                                    height: 45, width: 35,
                                    // tintColor: '#fff'
                                    }}
                                />
                            </CheckpointMarker>
                            <CheckpointMarker
                                latitude= {51.0452995902993}
                                longitude= {-114.0545529482637}
                            >
                                <Image source={require('../assets/Pin_Trans.png')}
                                    style={{
                                    height: 45, width: 35,
                                    // tintColor: '#fff'
                                    }}
                                />
                            </CheckpointMarker>
                        </CentreMapview>
                    }
                </View>
            </View>
        </SafeAreaView>
        </View>
    )
}

let styles = StyleSheet.create({
    container: {
    //   flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
})

export default MappingTest