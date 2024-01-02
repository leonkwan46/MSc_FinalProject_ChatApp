import React, { useEffect } from 'react'
import { Button, View } from 'react-native'
import { ContainerLoginSignup, TopNavLoginSignup } from '../components/SharedComponents'
import { setCurrentScreen } from '../redux/reducer/sessionSlice'
import { useDispatch } from 'react-redux'
import UploadDocument from '../components/extraDetails/UploadDocument'

const LoginSignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  // Update current screen
  useEffect(() => {
    dispatch(setCurrentScreen({ title: 'HOME' }))
}, [])
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