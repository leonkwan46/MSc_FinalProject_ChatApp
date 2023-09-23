import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const TopHeadingLoginSignup = (props) => {

  const isLogin = (props.page === 'login' ? true : false)

  return (
    <View style={ styles.container }>
      {
        isLogin ? 
        <Text style={ styles.text }> Login </Text> :
        <Text style={ styles.text }> Sign Up </Text>
      }
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  text: {
    color: '#fff',
    fontFamily: 'Lemon-Regular',
    fontSize: 50,
    display: 'flex',
  }
})

export default TopHeadingLoginSignup