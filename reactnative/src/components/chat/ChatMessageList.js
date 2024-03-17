import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import ChatRoom from './ChatRoom'
import { Box, VStack } from '@react-native-material/core'
import { getUserToken } from '../../redux/selectors'
import { useDispatch } from 'react-redux'
import { getChatRooms } from '../../redux/reducer/sessionSlice'
import { useFocusEffect } from '@react-navigation/native'

const ChatMessageList = () => {
    const dispatch = useDispatch()
    const [rooms, setRooms] = useState([])
    const token = getUserToken()
    
    const fetchRooms = async () => {
        const response = await dispatch(getChatRooms({ token, setRooms }))
        setRooms(response.payload)
    }

    useFocusEffect(
        useCallback(() => {
            fetchRooms()
        }, [])
    )

    return (
        <View>
            <VStack spacing={10} divider={true}>
                {rooms?.map((room) => (
                    <Box key={room._id}>
                        <ChatRoom roomData={room} />
                    </Box>
                ))}
            </VStack>
        </View>
    )
}

export default ChatMessageList
