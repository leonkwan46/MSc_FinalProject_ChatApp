import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const TopHeadingLoginSignup = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}> Login </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  text: {
    color: '#fff',
    fontFamily: 'Lemon-Regular',
    fontSize: 50,
    display: 'flex',
  }
})

export default TopHeadingLoginSignup