import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert, View, Button } from 'react-native';
import { HOST_SERVER } from './util'

export default function App() {

  const handleButtonClicked = async () => {
    let response = await fetch(`${HOST_SERVER}/api/ping`)
    let data = await response.json()
    console.log(data)
  }

  return (
    <View style={styles.container}>
      <Button
        title="Press me"
        onPress={() => handleButtonClicked()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
