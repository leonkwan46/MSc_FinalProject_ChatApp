import React, { useRef } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { sendMessage, receiveMessage } from '../../helpers/socketHelpers'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import MessageInput from '../../components/chat/MessageInput'
import Message from '../../components/chat/Message'

const ContainerChatMessage = () => {
    const { userId, socketId } = useSelector(state => state.session.user)
    const { roomId, name, members, messages: chatHistory, createdAt } = useSelector(state => state.session.currentChatRoom)

    const [oldMessages, setOldMessages] = useState([])
    const [message, setMessage] = useState('')
    const flatListRef = useRef(null)

    const handleSendMessage = () => {
        sendMessage(roomId, message, userId)
        setMessage('')
    }

    const fetchNewMessage = async () => {
      const lastestMessage = await receiveMessage()
      const { message, roomId, senderId } = lastestMessage
      const newMessage = {
        id: new Date().getTime().toString(),
        message,
        roomId,
        senderId,
    }
      setOldMessages([...oldMessages, newMessage])
    }

    useEffect(() => {
        fetchNewMessage()
    }, [oldMessages])

    useEffect(() => {
        flatListRef.current.scrollToEnd({ animated: true })
    }, [chatHistory, oldMessages])

    return (
        <View style={styles.messageContainer}>
            <View style={styles.messageList} >
                <FlatList
                    ref={flatListRef}
                    data={chatHistory && oldMessages ? [...chatHistory, ...oldMessages] : []}
                    renderItem={item => <Message messageData={item} />}
                    keyExtractor={item => item.id || item._id}
                    onLayout={() => {
                        flatListRef.current.scrollToEnd({ animated: true })
                    }}
                />
            </View>
            <MessageInput
                message={message}
                setMessage={setMessage}
                handleSendMessage={handleSendMessage}
            />
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
        flex: 1,
        padding: 10,
        paddingVertical: 20,
    },
    chatHistoryList: {
        flexGrow: 0,
    },
})

export default ContainerChatMessage
