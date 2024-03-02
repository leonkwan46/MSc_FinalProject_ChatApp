import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { getColor } from '../../helpers/styleHelper'
import { Icon } from 'react-native-elements'
import AddStudentPopover from './AddStudentPopover'

const AddBadge = () => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false)
    const handleOnPress = () => {
        setIsPopoverVisible(true)
    }
    const handleClosePopover = () => {
        setIsPopoverVisible(false)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.badgeContainer} onPress={handleOnPress}>
                <Icon name="add" type="material" color="black" />
            </TouchableOpacity>

            <AddStudentPopover
                isPopoverVisible={isPopoverVisible}
                handleClosePopover={handleClosePopover}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: '15%',
        right: '10%',
    },
    badgeContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: getColor('primary'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
})

export default AddBadge
