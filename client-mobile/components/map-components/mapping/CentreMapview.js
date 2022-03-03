import CurrentMapview from './CurrentMapview'


const CentreMapview = (props) => {
    const coords1 = props.coords1
    const coords2 = props.coords2
    const mapCenter = props.mapCenter
    const setMapCenter = props.setMapCenter

    console.log ('coords1:',coords1)
    console.log ('coords2:',coords2)

    let long = (coords1.longitude+coords2.longitude)/2
    let lat = (coords1.latitude+coords2.latitude)/2
    let deltaLong = Math.abs(coords1.longitude-coords2.longitude)*1.2
    let deltaLat = Math.abs(coords1.latitude-coords2.latitude)*1.2

    console.log(deltaLong, deltaLat)
    if (deltaLat<0.0025) {deltaLat=0.0025} else {deltaLat=deltaLat}
    if (deltaLong<.001) {deltaLong=0.001} else {deltaLong=deltaLong}
    console.log(deltaLong, deltaLat)

    return (
      <CurrentMapview
        latitude= {mapCenter.latitude} 
        longitude= {mapCenter.longitude}
        latitudeDelta= {mapCenter.latitudeDelta}
        longitudeDelta= {mapCenter.longitudeDelta}
        mapCenter = {mapCenter}
        setMapCenter = {setMapCenter}
      >
        {props.children}
      </CurrentMapview>
    )
}

export default CentreMapview