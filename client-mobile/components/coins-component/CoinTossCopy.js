import {useRef, useEffect} from 'react';
import { Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { Portal } from 'react-native-paper';


const CoinTossCopy = (props) => {
  const progress=useRef (new Animated.Value(0)).current

  const handleAnimation = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2150,
      useNativeDriver: true,

    }).start(()=>{
      props.setShowCoinAnimation(false)
    });
  }

  useEffect (()=>{
    handleAnimation()
  },[])

    return (
      <Portal>
      <LottieView  style=
        {{
          width: '100%',
          height: '100%',
          zIndex: 0,
          position: 'absolute',
        }}
        source={require('../../assets/coin-toss.json')}
        progress={progress}
      />
     </Portal>
      );
  }

export default CoinTossCopy