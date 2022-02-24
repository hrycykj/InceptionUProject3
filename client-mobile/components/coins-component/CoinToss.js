import React from 'react';
import { Button, StyleSheet, View, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

// export default class App extends React.Component {
//   componentDidMount() {
//     this.animation.play();

//     // Or set a specific startFrame and endFrame with:
//     // this.animation.play(30, 120);
//   }

//   render() {
//     return (
//       <View style={styles.animationContainer}>
//         <LottieView
//           ref={animation => {
//             this.animation = animation;
//           }}
//           style={{
//             width: 400,
//             height: 600,
            
//           }}
//           source={require('../../assets/coin-toss.json')}
//           // OR find more Lottie files @ https://lottiefiles.com/featured
//           // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   animationContainer: {
//     zIndex: 100,
//     position: 'absolute',
    
//   },

// });

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2150,
    }).start();
  }

  render() {
    return (
      <LottieView  style={{
        width: 400,
        height: 600,
        zIndex: 100,
        position: 'absolute',
     }}
     source={require('../../assets/coin-toss.json')} progress={this.state.progress} />
     
      );
  }
}