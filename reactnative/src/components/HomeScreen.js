import React from 'react'
import { Text, Button, View, StyleSheet } from 'react-native'
import ContainerLoginSignup from './StyledComponents/ContainerLoginSignup'
import TopNavLoginSignup from './SharedComponents/TopNavLoginSignup'

const LoginScreen = ({ navigation }) => {
  return (
    <ContainerLoginSignup>
        <TopNavLoginSignup page='login' />
        <View style={ styles.text }>
          <Text>Home Page</Text>
        </View>
        <View>
          <Button
            title="Go to Login"
            onPress={() => navigation.navigate('LoginScreen')}
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
  text: {
    alignItems: 'center',
  }
})

export default LoginScreen