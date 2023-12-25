import React from 'react'
import { Text, View } from 'react-native'
import { setCurrentScreen } from '../redux/reducer/sessionSlice'
import { useDispatch } from 'react-redux'

const MessageScreen = () => {
    const dispatch = useDispatch()
    // Update current screen
    dispatch(setCurrentScreen('MESSAGES'))
    return (
        <View>
            <Text>
                Message Screen
            </Text>
        </View>
    )
}

export default MessageScreen
