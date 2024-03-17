import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import StatusContainer from '../feedback/StatusContainer'
import { getUserStatus } from '../../../redux/selectors'

const LoggedInContainer = ({ children }) => {
    const { error } = getUserStatus()
    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.innerContainer }>
                <StatusContainer message={error} />
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
