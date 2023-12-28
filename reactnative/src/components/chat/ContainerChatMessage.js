import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { sendMessage, receiveMessage } from '../../helpers/socketHelpers'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import MessageInput from '../../components/chat/MessageInput'
import Message from '../../components/chat/Message'
import { ScrollView } from 'react-native-gesture-handler'

const ContainerChatMessage = () => {
    const user = useSelector(state => state.session.user)
    const { userId, socketId } = user

    const roomData = useSelector(state => state.session.currentChatRoom)
    const { roomId, name, members, messages, createdAt } = roomData

    const [oldMessages, setOldMessages] = useState([])
    const [message, setMessage] = useState('')

    const handleSendMessage = async () => {
        await sendMessage(roomId, message, userId)
        setMessage('')
    }

    const fetchNewMessage = async () => {
      const lastestMessage = await receiveMessage()
      const { message, roomId, userId } = lastestMessage
      const newMessage = {
        id: new Date().getTime().toString(),
        message,
        roomId,
        senderId: userId,
    }
      setOldMessages([...oldMessages, newMessage])
    }

    useEffect(() => {
        fetchNewMessage()
    }, [oldMessages])

    return (
        <View style={styles.messageContainer}>
            <ScrollView style={styles.messageList} >
                <FlatList
                    data={oldMessages}
                    renderItem={ item => <Message messageData={item} />}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
            <View>
                <MessageInput
                    message={message}
                    setMessage={setMessage}
                    handleSendMessage={handleSendMessage}
                />
            </View>
        </View>
      )
    }

const styles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    messageList: {
        padding: 10,
        backgroundColor: 'black',
        // Fix later
        height: '90vh',
    },
    sendButtonContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderTopColor: 'grey',
        borderTopWidth: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
})

export default ContainerChatMessage
