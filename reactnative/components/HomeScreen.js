import React from 'react'
import { Text, Button, View, StyleSheet } from 'react-native'
import BackgroundImageContainer from '../StyledComponents/BackgroundImageContainer'
import TopHeadingLoginSignup from '../SharedComponents/TopHeadingLoginSignup'
import TopNavLoginSignup from '../SharedComponents/TopNavLoginSignup'

const LoginScreen = ({ navigation }) => {
  return (
    <BackgroundImageContainer>
      <View style={styles.container}>
        <TopNavLoginSignup page='login' />
        <View style={styles.text}>
          <Text>Home Page</Text>
        </View>
        <View>
          <Button
            title="Go to Login"
            onPress={() => navigation.navigate('LoginScreen')}
            />
        </View>
      </View>
    </BackgroundImageContainer>
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