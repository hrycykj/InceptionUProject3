
import CurrentMapview from './CurrentMapview'


const CentreMapview = (props) => {
    const coords1 = props.coords1
    const coords2 = props.coords2

        let long = (coords1.longitude+coords2.longitude)/2
        let lat = (coords1.latitude+coords2.latitude)/2
        let deltaLong = Math.abs(coords1.longitude-coords2.longitude)*1.2
        let deltaLat = Math.abs(coords1.latitude-coords2.latitude)*1.2

    return (
      <CurrentMapview
      latitude= {lat} 
      longitude= {long}
      latitudeDelta= {deltaLat}
      longitudeDelta= {deltaLong}
      >
        {props.children}
      </CurrentMapview>
    )
}

export default CentreMapview