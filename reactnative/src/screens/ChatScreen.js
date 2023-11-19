import { Text, View } from 'react-native'
import { sendMessage } from '../helpers/socketIOHelpers'
import { Button } from '@react-native-material/core'

const ChatScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Chat Screen</Text>
            <Button onPress={() => sendMessage('Hello from ChatScreen')}>Send Message</Button>
        </View>
    )
}

export default ChatScreen