import React from 'react'
import { ImageBackground, View, ScrollView, StyleSheet } from 'react-native'

const image = require('../../../assets/images/login-signup-bg-img.jpg')

export const ContainerLoginSignup = ({ children }) => {
    return (
        <ImageBackground
          source={image}
          style={styles.container}
        >
          <View style={ styles.backgroundColor }>
          <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps='handled'
                >
            {children}
          </ScrollView>
          </View>
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
        paddingTop: '20%',
    },
})

export default ContainerLoginSignup