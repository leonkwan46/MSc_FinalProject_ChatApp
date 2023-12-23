import React from 'react'
import { Button, View } from 'react-native'
import { ContainerLoginSignup, TopNavLoginSignup } from '../components/SharedComponents'

const LoginSignUpScreen = ({ navigation }) => {
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