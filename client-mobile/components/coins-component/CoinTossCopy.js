import {useRef, useEffect} from 'react';
import { Animated } from 'react-native';
import LottieView from 'lottie-react-native';


const CoinTossCopy = () => {
  const progress=useRef (new Animated.Value(0)).current

  const handleAnimation = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2150,
      useNativeDriver: true,
    }).start();
  }

  useEffect (()=>{
    handleAnimation()
  },[])

    return (
      <LottieView  style=
        {{
          width: 400,
          height: 600,
          zIndex: 0,
          position: 'absolute',
        }}
        source={require('../../assets/coin-toss.json')}
        progress={progress}
      />
     
      );
  }

export default CoinTossCopy