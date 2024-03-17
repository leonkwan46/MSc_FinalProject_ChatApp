import React from 'react'
import { ImageBackground, StyleSheet, SafeAreaView } from 'react-native'
import StatusContainer from '../feedback/StatusContainer'
import { getAuthStatus } from '../../../redux/selectors'

const image = require('../../../../assets/images/login-signup-bg-img.jpg')

const ContainerLoginSignup = ({ children }) => {
  const { error } = getAuthStatus()

  return (
      <ImageBackground
        source={image}
        style={styles.container}
      >
        <StatusContainer message={error} />
        <SafeAreaView style={ styles.backgroundColor }>
          {children}
        </SafeAreaView>
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      resizeMode: 'cover',
    },
    backgroundColor: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
    },
})

export default ContainerLoginSignup