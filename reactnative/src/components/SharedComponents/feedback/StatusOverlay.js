import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { Overlay } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { closeStatusOverlay } from '../../../redux/reducer/signUpInfoSlice'

const StatusOverlay = ({message, status}) => {
    
    const dispatch = useDispatch()

    // Images
    const done = require('../../../../assets/images/done.png')
    const failed = require('../../../../assets/images/error.png')

    const visible = useSelector((state) => state.signUpInfo.isStatusOverlayOpen)

    // status = true

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(closeStatusOverlay())
        }, 1000)
        return () => { clearTimeout(timer) }
    }, [visible])

    return (
        <Overlay isVisible={visible} overlayStyle={styles.overlay} onBackdropPress={() => dispatch(closeStatusOverlay())}>
            <View>
                <Image source={status ? done : failed} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={status ? styles.success : styles.failed}>{status ? 'Success!' : 'Failed!'}</Text>
                <Text style={styles.errorMessage}>{status ? 'Welcome!' : message}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={status ? styles.buttonSuccess : styles.buttonFailed} onPress={() => dispatch(closeStatusOverlay())}>
                    <Text style={styles.buttonText}>{status ? 'Okay' : 'Try Again'}</Text>
                </Pressable>
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        width: '80%',
        height: '40%',
        alignItems: 'center',
        borderRadius: 10,
    },
    image: {
        width: 80,
        height: 80,
        margin: 30,
    },
    textContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    failed: {
        fontFamily: 'Lemon-Regular',
        fontSize: 24,
        color: 'red',
        marginBottom: 10,
    },
    success: {
        fontFamily: 'Lemon-Regular',
        fontSize: 24,
        color: 'green',
        marginBottom: 10,
    },
    errorMessage: {
        fontSize: 20,
    },
    buttonContainer: {
        marginTop: 20,
    },
    buttonFailed: {
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    buttonSuccess: {
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    buttonText: {
        fontFamily: 'Lemon-Regular',
        fontSize: 18,
        padding: 5,
        color: '#fff',
    }
})

export default StatusOverlay