import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { sendMessage, receiveMessage } from '../../helpers/socketHelpers'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import MessageInput from '../../components/chat/MessageInput'
import Message from '../../components/chat/Message'
import { ScrollView } from 'react-native-gesture-handler'

const ContainerChatMessage = () => {
    const user = useSelector(state => state.auth.user)
    const { _id, socketId } = user
    const [oldMessages, setOldMessages] = useState([])
    const [message, setMessage] = useState('')

    const handleSendMessage = async () => {
        sendMessage(message, socketId, _id)
        setMessage('')
    }

    const fetchNewMessage = async () => {
      const received = await receiveMessage()
      const { recipientUserId, recipientSocketId, message } = received.data
      const newMessage = {
        id: new Date().getTime().toString(),
        senderSessionID: recipientSocketId,
        senderUserID: recipientUserId,
        message
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
                    renderItem={({ item }) => <Message messageData={item} />}
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
