import { Text, View, Button, FlatList, TextInput } from 'react-native'
import { sendMessage, receiveMessage } from '../helpers/socketHelpers'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ContainerChatMessage from '../components/chat/ContainerChatMessage'

const ChatScreen = ({ navigation }) => {
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
        id: new Date().getTime().toString().slice(0,-3),
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
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholder="Type your message..."
            />
            <Button onPress={handleSendMessage} title="Send Message" />
          </View>
        </View>
      )
    }

export default ChatScreen