import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

const TITLES = {
    HOME: 'Home',
    LOGIN: 'Login',
    REGISTER: 'Register',
    CONTACTS: 'Contacts',
    MESSAGES: 'Messages',
}

const TopHeading = () => {
  const currentScreen = useSelector(state => state.session.currentScreen)
  const title = TITLES[Object.keys(TITLES).find((item) => item === currentScreen)]
  const isLoginRegister = currentScreen === 'LOGIN' || currentScreen === 'REGISTER'

  return (
    <View style={ isLoginRegister ? styles.containerLoginRegister : styles.container }>
        <Text style={ isLoginRegister ? styles.textLoginRegister : styles.text }> {title} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  containerLoginRegister: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  textLoginRegister: {
    color: '#fff',
    fontFamily: 'Lemon-Regular',
    fontSize: 50,
    display: 'flex',
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    marginTop: 40,
  },
  text: {
    color: '#D4AF37',
    fontFamily: 'Lemon-Regular',
    fontSize: 40,
    display: 'flex',
  },
})

export default TopHeading