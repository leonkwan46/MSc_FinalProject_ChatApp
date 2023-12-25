import React from 'react'
import { Button, View } from 'react-native'
import { ContainerLoginSignup, TopNavLoginSignup } from '../components/SharedComponents'
import { setCurrentScreen } from '../redux/reducer/sessionSlice'
import { useDispatch } from 'react-redux'

const LoginSignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  // Update current screen
  dispatch(setCurrentScreen('HOME'))
  return (
    <ContainerLoginSignup>
        <TopNavLoginSignup />
        <View>
          <Button
            title='Go to Login'
            onPress={() => navigation.navigate('LoginSignUpScreen', { isLogin: true })}
          />
        </View>
    </ContainerLoginSignup>
  )
}

export default LoginSignUpScreen