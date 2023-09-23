import React from 'react'
import { View, Text, StyleSheet, Pressable } from "react-native"
import { closeOverlay } from '../../redux/reducer/overlaySlice'
import { useDispatch } from 'react-redux'

const OverlayInfo = () => {
    const dispatch = useDispatch()
    return (
            <View style={styles.infoContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {String.fromCodePoint(0x2757)} ATTENTION {String.fromCodePoint(0x2757)}
                    </Text>
                </View>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>Sign up as a Teacher</Text>
                </View>
                <View style={styles.subsubtitleContainer}>
                    <Text style={styles.subsubtitle}>** You will need to upload the following documents to complete your registration.</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>1. Enhanced DBS Certificate</Text>
                    <Text style={styles.text}>2. Proof of ID</Text>
                    <Text style={styles.text}>3. Professional Qualification Certificates</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.button}
                        onPress={() => dispatch(closeOverlay())}
                        >
                        <Text>Ready!</Text>
                    </Pressable>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        margin: 30,
        height: '100%',
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'red',
    },
    subtitleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    subsubtitleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
    },
    subsubtitle: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    textContainer: {
        height: '20%',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '40%',
        borderRadius: 10,
        borderWidth: 1,
    },
})

export default OverlayInfo