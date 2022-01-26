import { Text, View } from 'react-native'

const QrCodeChecker = (props) => {
    let location = props.location
    let checkPoint = props.checkPoint

    return (
        <View>
            <Text>inside the Qr code checker</Text>
            <Text>{checkPoint.title}</Text>
        </View>
    )
}

export default QrCodeChecker