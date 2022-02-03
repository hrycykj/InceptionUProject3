import { View, Text } from 'react-native'

const QuestCompletionSplash = () => {

    return (
        <View style={{backgroundColor:'white'}}>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#ff0000"
                }}
            >
                CONGRATULATIONS - You've completed the quest!
            </Text>
        </View>
    )
}

export default QuestCompletionSplash