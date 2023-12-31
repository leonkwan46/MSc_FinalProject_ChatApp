import React from 'react'
import { StyleSheet, ImageBackground, ScrollView, SafeAreaView} from 'react-native'

const image = require('../../../assets/images/dark-piano.png')


const ContainerExtraDetails = ({ children }) => {
    return (
        <ImageBackground
            source={image}
            style={styles.container}
        >
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