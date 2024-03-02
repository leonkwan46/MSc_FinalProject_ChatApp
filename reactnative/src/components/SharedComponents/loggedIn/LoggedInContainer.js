import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

const LoggedInContainer = ({ children }) => {
    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.innerContainer }>
                {children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    innerContainer: {
        flex: 1,
        padding: 20,
    },
})

export default LoggedInContainer
