import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ContainerLoginSignup, TopNavLoginSignup } from '../components/SharedComponents'
import { useDispatch } from 'react-redux'
import { Button, Typography } from '../compLib'

const LoginSignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch()

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