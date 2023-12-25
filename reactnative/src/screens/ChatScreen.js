import { View } from 'react-native'
import ContainerChatMessage from '../components/chat/ContainerChatMessage'
import { useDispatch } from 'react-redux'
import { setCurrentScreen } from '../redux/reducer/sessionSlice'

const ChatScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  // Update current screen
  dispatch(setCurrentScreen('CHAT'))
  return (
    <View>
      <ContainerChatMessage />
    </View>
  )
}

export default ChatScreen