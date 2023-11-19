import React from 'react'
import { Button, View, StyleSheet } from 'react-native'
import { ContainerLoginSignup, TopNavLoginSignup } from "../components/SharedComponents"

const LoginSignUpScreen = ({ navigation }) => {
  return (
    <ContainerLoginSignup>
        <TopNavLoginSignup />
        <View>
          <Button
            title="Go to Login"
            onPress={() => navigation.navigate('LoginSignUpScreen', { isLogin: true })}
          />
        </View>
    </ContainerLoginSignup>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
})

export default LoginSignUpScreen