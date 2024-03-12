import { SafeAreaView, StyleSheet } from 'react-native'
import ContainerChatMessage from '../components/chat/ContainerChatMessage'
import { getChatRoomInfo } from '../redux/selectors'
import ChatRoomTopHeading from '../components/chat/ChatRoomTopHeading'
import { useEffect } from 'react'
import { setCurrentChatRoom } from '../redux/reducer/sessionSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const ChatScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { name } = getChatRoomInfo()

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(setCurrentChatRoom({}))
    })
    return unsubscribe
  }, [navigation])
  return (
    <SafeAreaView style={styles.container}>
      <ChatRoomTopHeading name={name} />
      <ContainerChatMessage />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ChatScreen