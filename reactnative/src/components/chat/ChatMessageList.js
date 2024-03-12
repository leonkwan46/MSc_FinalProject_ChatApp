import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Room from './Room'
import axios from 'axios'
import { Box, VStack } from '@react-native-material/core'

const ChatMessageList = () => {
    const [rooms, setRooms] = useState([])

    const fetchRooms = async () => {
        try {
            const response = await axios.get('http://localhost:5000/chat_message/get_rooms')
            setRooms(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchRooms()
    }, [])

    return (
        <View>
            <View>
                <VStack spacing={10} divider={true}>
                    {rooms.map((room) => (
                        <Box key={room._id}>
                            <Room roomData={room} />
                        </Box>
                    ))}
                </VStack>
            </View>
        </View>
    )
}

export default ChatMessageList
