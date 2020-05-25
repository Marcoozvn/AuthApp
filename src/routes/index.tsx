import React, { useState } from 'react'
import LottieView from "lottie-react-native";
import animationJson from '../../assets/fingerprint-success.json'
import { SafeAreaView } from 'react-native'

import { useAuth } from '../contexts/auth'
import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

const Routes: React.FC = () => {
  const { signed, loading } = useAuth()
  const [animation, setAnimation] = useState<LottieView | null>(null)

  if (loading) {
    return <LottieView duration={1700} loop={false} source={animationJson} ref={ animation => {
      setAnimation(animation)
      animation?.play()
    } }></LottieView>
  } else {
    return signed ? <AppRoutes /> : <AuthRoutes />
  }
}

export default Routes