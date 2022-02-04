import { View, Text } from "react-native";

const QuestCompletionSplash = (props) => {
  const quest = props.quest;
  return (
    <View style={{ backgroundColor: "white", padding: 16 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#ff0000",
          marginBottom: 16,
        }}
      >
        CONGRATULATIONS - You've completed the quest!
      </Text>
      <Text>{quest?.completionStory}</Text>
    </View>
  );
};

export default QuestCompletionSplash;
