import React from 'react'
import { ImageBackground, ScrollView, StyleSheet, SafeAreaView, View } from 'react-native'
import { useSelector } from 'react-redux'
import StatusOverlay from '../feedback/StatusOverlay'
import Loading from '../feedback/Loading'

const image = require('../../../../assets/images/login-signup-bg-img.jpg')

const ContainerLoginSignup = ({ children }) => {
  const { isLoading, error, token } = useSelector(state => state.auth)
  const status = error && !token ? true : false
  return (
      <ImageBackground
        source={image}
        style={styles.container}
      >
        {isLoading ? <Loading /> : null}
        {status ? <StatusOverlay message={error} /> : null}
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