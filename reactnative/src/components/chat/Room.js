import React from 'react'
import { Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setCurrentChatRoom } from '../../redux/reducer/sessionSlice'
import { joinRoom } from '../../helpers/socketHelpers'
import { Typography } from '../../compLib'

const Room  = ({
    roomData,
}) => {
    console.log(roomData)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handleOnPress = async () => {
        await joinRoom(roomData.item._id)
        dispatch(setCurrentChatRoom(roomData.item))
        navigation.navigate('ChatScreen')
    }
    return (
        <View>
            <Pressable onPress={handleOnPress}>
                <Typography color='secondary'>{roomData.item.name}</Typography>
            </Pressable>
        </View>
    )
}

export default Room
