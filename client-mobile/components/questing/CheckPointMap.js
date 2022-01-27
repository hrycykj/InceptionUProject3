import { Image } from 'react-native'

import CentreMapview from '../mapping/CentreMapview'
import CheckpointMarker from '../mapping/CheckpointMarker'

const CheckPointMap = (props) => {
    let coords1 = props.myLocation
    let coords2 = props.checkPointLocation

    return (
        <>
            <CentreMapview
                coords1= {coords1} 
                coords2= {coords2}
            >
                <CheckpointMarker
                    latitude= {coords1.latitude}
                    longitude= {coords1.longitude}
                >
                    <Image source={require('../../assets/Pin_Trans.png')}
                        style={{
                        height: 45, width: 35,
                        // tintColor: '#fff'
                        }}
                    />
                </CheckpointMarker>
                <CheckpointMarker
                    latitude= {coords2.latitude}
                    longitude= {coords2.longitude}
                >
                    <Image source={require('../../assets/Pin_Trans.png')}
                        style={{
                        height: 45, width: 35,
                        tintColor: '#ff0000'
                        }}
                    />
                </CheckpointMarker>
            </CentreMapview>
        </>
    )
}

export default CheckPointMap