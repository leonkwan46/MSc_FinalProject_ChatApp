import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Typography } from '../../compLib'

const TITLES = {
    HOME: 'Home',
    LOGIN: 'Login',
    REGISTER: 'Register',
    EXTRADETAILS: 'Extra Details',
    CONTACTS: 'Contacts',
    MESSAGES: 'Messages',
}

const TopHeading = () => {
  const currentScreen = useSelector(state => state.session.currentScreen)
  const { title, subtitle } = currentScreen
  const currentTitle = TITLES[Object.keys(TITLES).find((item) => item === title)]
  const isLoginRegister = title === 'LOGIN' || title === 'REGISTER'

  return (
    <View style={ isLoginRegister ? styles.containerLoginRegister : styles.container }>
        <Typography color='secondary' size='title' > {currentTitle} </Typography>
        { subtitle && 
            <View>
                <Typography style={ styles.subtitle }> {subtitle} </Typography>
            </View>
        }
    </View>
  )
}

const styles = StyleSheet.create({
  containerLoginRegister: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  titleLoginRegister: {
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
  title: {
    color: '#D4AF37',
    fontFamily: 'Lemon-Regular',
    fontSize: 40,
    display: 'flex',
  },
  subtitle: {
    color: '#D4AF37',
    fontFamily: 'Lemon-Regular',
    fontSize: 20,
    display: 'flex',
  },
})

export default TopHeading