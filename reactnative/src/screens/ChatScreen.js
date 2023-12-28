import { Text, View } from 'react-native'
import ContainerChatMessage from '../components/chat/ContainerChatMessage'
import { useSelector } from 'react-redux'

const ChatScreen = () => {
  const roomData = useSelector(state => state.session.currentChatRoom)
  const { roomId, name, members, messages, createdAt } = roomData
  return (
    <View>
      <Text>{name}</Text>
      <ContainerChatMessage />
    </View>
  )
}

export default ChatScreen