import React from 'react'
import { Overlay } from 'react-native-elements'
import OverlayInfo from './OverlayInfo'
import { useDispatch, useSelector } from 'react-redux'
import { closeTeacherOverlay } from '../../redux/reducer/signUpInfoSlice'
import { StyleSheet, View, ImageBackground } from 'react-native'

const image = require('../../../assets/images/overlay.jpg')

const AttentionOverlay = () => {
    const dispatch = useDispatch()
    const visible = useSelector((state) => state.signUpInfo.isTecherOverlayOpen)

    return (
            <Overlay isVisible={visible} onBackdropPress={() => dispatch(closeTeacherOverlay())} overlayStyle={styles.overlay} >
                <ImageBackground
                    source={image}
                    style={styles.imageContainer}
                >
                    <View style={styles.backgroundColor}>
                         <OverlayInfo />
                    </View>
                </ImageBackground>
            </Overlay>

    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        resizeMode: 'cover',
        overflow: 'hidden',
        borderRadius: 30,
    },
    backgroundColor: {
        flex: 1,
        backgroundColor: 'rgba(500, 500, 500, 0.5)',
    },
    overlay: {
        padding: 0,
        width: '70%',
        height: '60%',
        borderRadius: 30,
    },
})

export default AttentionOverlay;