import React from 'react'
import { ImageBackground, Modal, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { Typography } from '../../compLib'
import CreateRoomActionForm from './CreateRoomActionForm'


const backgroundImage = require('../../../assets/images/piano-dark.jpg')

const CreateRoomPopover = (props) => {
    const { isPopoverVisible, handleClosePopover } = props
    return (
        <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={handleClosePopover}
            visible={isPopoverVisible}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPressOut={handleClosePopover}
                style={styles.wrapper}
            >
                <ScrollView style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View>
                            <ImageBackground
                                source={backgroundImage}
                                style={styles.backgroundImage}
                            >
                                <View style={styles.popoverContainer}>
                                    <View style={styles.popoverContentContainer}>
                                        <View style={styles.title}>
                                            <Typography size='xl' color='primary'>Create Chat Room</Typography>
                                        </View>
                                        <CreateRoomActionForm handleClosePopover={handleClosePopover} />
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContainer: {
        position: 'absolute',
        borderRadius: 30,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        overflow: 'hidden',
        borderRadius: 30,
    },
    popoverContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    popoverContentContainer: {
        padding: 20,
    },
    title: {
        paddingHorizontal: 0,
        paddingVertical: 20,
    },
})

export default CreateRoomPopover