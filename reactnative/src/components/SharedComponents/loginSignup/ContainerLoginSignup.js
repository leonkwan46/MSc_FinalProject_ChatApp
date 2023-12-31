import React from 'react'
import { ImageBackground, ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import { Loading, StatusOverlay } from '../index'

const image = require('../../../../assets/images/login-signup-bg-img.jpg')

const ContainerLoginSignup = ({ children }) => {
  const { isLoading, error, token } = useSelector((state) => state.auth)
  const status = error && !token ? true : false
  return (
      <ImageBackground
        source={image}
        style={styles.container}
      >
          {isLoading ? <Loading /> : null}
          {status ? <StatusOverlay message={error} /> : null}

          <SafeAreaView style={ styles.backgroundColor }>
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled'
              >
                  {children}
              </ScrollView>
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