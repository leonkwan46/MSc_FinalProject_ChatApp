import React from 'react'
import { StyleSheet, ImageBackground, ScrollView, SafeAreaView} from 'react-native'
import StatusContainer from '../SharedComponents/feedback/StatusContainer'
import { getUserStatus } from '../../redux/selectors'

const image = require('../../../assets/images/piano-dark.jpg')

const ContainerExtraDetails = ({ children }) => {
    const { error } = getUserStatus()

    return (
        <ImageBackground
            source={image}
            style={styles.container}
        >
            <StatusContainer message={error} />

            <SafeAreaView style={ styles.backgroundColor }>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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

export default ContainerExtraDetails