import React from 'react'
import { Text, View } from 'react-native'

const ContainerChatMessage = ({ messageData }) => {
    const { senderSessionID, senderUserID, message } = messageData
    return (
        <View>
            <Text>{message}</Text>
        </View>
    )
}

export default ContainerChatMessage
