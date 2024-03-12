import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { getColor } from '../../helpers/styleHelper'
import { Icon } from 'react-native-elements'
import AddParentPopover from './AddParentPopover'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const AddBadge = () => {
    const navigation = useNavigation()
    const { role } = useSelector((state) => state.session.user)
    const [isPopoverVisible, setIsPopoverVisible] = useState(false)
    const handleOnPress = () => {
        setIsPopoverVisible(true)
        if (role === 'parent') navigation.navigate('ExtraDetailsScreen', { isStudent: true })
    }
    const handleClosePopover = () => {
        setIsPopoverVisible(false)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.badgeContainer} onPress={handleOnPress}>
                <Icon name="add" type="material" color="black" />
            </TouchableOpacity>

            { role === 'teacher' && (
                <AddParentPopover
                    isPopoverVisible={isPopoverVisible}
                    handleClosePopover={handleClosePopover}
                />
            )}

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
})

export default AddBadge
