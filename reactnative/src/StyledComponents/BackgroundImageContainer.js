import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native'

const image = require('../../assets/images/login-signup-bg-img.jpg')

export const BackgroundImageContainer = ({ children }) => {
    return (
      <ImageBackground
        source={image}
        style={styles.container}
      >
        {children}
      </ImageBackground>
    )
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      resizeMode: 'cover',
    }
})

export default BackgroundImageContainer