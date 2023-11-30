import { Text, View, Button, FlatList, TextInput } from 'react-native'
import { sendMessage, receiveMessage, disconnectSocket } from '../helpers/socketHelpers'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const ChatScreen = ({ navigation }) => {
    const user = useSelector(state => state.auth.user)
    const { _id, socketId } = user
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    const handleSendMessage = async () => {
        sendMessage(message, socketId, _id)
        setMessage('')
    }

    useEffect(() => {
        const fetchNewMessage = async () => {
            const data = await receiveMessage()
            const newMessage = {
                id: Math.random().toString(),
                message: data.data.message
            }
            setMessages([...messages, newMessage])
        }
        fetchNewMessage()
        console.log(messages)
    }, [messages])

    return (
        <View style={{ flex: 1 }}>
          <Text>Chat Screen</Text>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.message}</Text>
              </View>
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