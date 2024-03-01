import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import Room from './Room'
import axios from 'axios'

const ContainerMessages = () => {
    const [rooms, setRooms] = useState([])

    const fetchRooms = async () => {
        try {
            const response = await axios.get('http://localhost:5000/chat_message/rooms')
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
                <FlatList
                    data={rooms}
                    renderItem={item => <Room roomData={item} />}
                    keyExtractor={item => item.createAt}
                />
            </View>
        </View>
    )
}

export default ContainerMessages
