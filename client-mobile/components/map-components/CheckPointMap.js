import { Image } from 'react-native'
import { useTheme } from 'react-native-paper'
import CentreMapview from './mapping/CentreMapview'
import CheckpointMarker from './mapping/CheckpointMarker'

const CheckPointMap = (props) => {
    let coords1 = props.myLocation
    let coords2 = props.checkPointLocation
    let { colors } = useTheme()

    return (
        <>
            <CentreMapview
                coords1= {coords1} 
                coords2= {coords2}
            >
                <CheckpointMarker
                    latitude= {coords1.latitude}
                    longitude= {coords1.longitude}
                    title={"Me!"}
                >
                    <Image source={require('../../assets/Pin_Trans.png')}
                        style={{
                        height: 55, width: 45,
                        tintColor: colors.text
                        }}
                    />
                </CheckpointMarker>
                <CheckpointMarker
                    latitude= {coords2.latitude}
                    longitude= {coords2.longitude}
                    title={"Checkpoint"}
                >
                    <Image source={require('../../assets/Pin_Trans.png')}
                        style={{
                        height: 55, width: 45,
                        tintColor: colors.accent
                        }}
                    />
                </CheckpointMarker>
            </CentreMapview>
        </>
    )
}

export default CheckPointMap