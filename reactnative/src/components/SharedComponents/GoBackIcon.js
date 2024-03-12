import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

const GoBackIcon = ({buttonStyle, iconColor}) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={buttonStyle}>
            <Icon name='arrow-back' color={iconColor} />
        </TouchableOpacity>
    )
}

export default GoBackIcon
