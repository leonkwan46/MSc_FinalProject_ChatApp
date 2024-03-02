import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ContainerLoginSignup, TopNavLoginSignup } from '../components/SharedComponents'
import { Button, Typography } from '../compLib'

const LoginSignUpScreen = ({ navigation }) => {

  return (
    <ContainerLoginSignup>
        <TopNavLoginSignup />
        <View>
          <Button
            color='primary'
            onPress={() => navigation.navigate('LoginSignUpScreen', { isLogin: true })}
          >
            <Typography>Go to Login</Typography>
          </Button>
        </View>
    </ContainerLoginSignup>
  )
}

export default LoginSignUpScreen