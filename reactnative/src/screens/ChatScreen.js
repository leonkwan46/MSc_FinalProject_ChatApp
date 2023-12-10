import { Text, View, Button, FlatList, TextInput } from 'react-native'
import { sendMessage, receiveMessage, disconnectSocket } from '../helpers/socketHelpers'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

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
        fetchNewMessage()
    }, [oldMessages])

    return (
        <View style={{ flex: 1 }}>
          <Text>Chat Screen</Text>
          <FlatList
            data={oldMessages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.message}</Text>
              </View>
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