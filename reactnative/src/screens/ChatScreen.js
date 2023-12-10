import { Text, View, Button, FlatList, TextInput } from 'react-native'
import { sendMessage, receiveMessage } from '../helpers/socketHelpers'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ContainerChatMessage from '../components/chat/ContainerChatMessage'

const ChatScreen = ({ navigation }) => {
    const user = useSelector(state => state.auth.user)
    const { _id, socketId } = user
    const [oldMessages, setOldMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const handleSendMessage = async () => {
        sendMessage(newMessage, socketId, _id)
        setNewMessage('')
    }

    const fetchNewMessage = async () => {
      const received = await receiveMessage()
      const chatHistory = {
        // Should be date
          id: Math.random().toString(),
          message: received.data.message
      }
      setOldMessages([...oldMessages, chatHistory])
    }

    useEffect(() => {
        const fetchNewMessage = async () => {
            const data = await receiveMessage()
            const { recipientUserId, recipientSocketId, message } = data.data
            const newMessage = {
                id: new Date().getTime().toString().slice(0,-3),
                senderSessionID: recipientSocketId,
                senderUserID: recipientUserId,
                message
            }
            setMessages([...messages, newMessage])
        }
        fetchNewMessage()
    }, [messages])

    return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={oldMessages}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <ContainerChatMessage messageData={item.item} />
            )}
          />
          <View>
            <TextInput
              value={newMessage}
              onChangeText={(text) => setNewMessage(text)}
              placeholder="Type your message..."
            />
            <Button onPress={handleSendMessage} title="Send Message" />
          </View>
        </View>
      )
    }

export default ChatScreen