import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

const Message = ({
    messageData
}) => {
    const { senderSessionID, senderUserID, message } = messageData
    const user = useSelector(state => state.auth.user)
    const isSender = user._id === senderUserID

    return (
        <View style={ isSender ? styles.senderContainer : styles.receiverContainer }>
            <Text style={ isSender ? styles.senderText : styles.receiverText }>{ message }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    senderContainer: {
        backgroundColor: '#D4AF37',
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    senderText: {
        color: 'black',
        fontSize: 16,
    },
    receiverContainer: {
        backgroundColor: 'grey',
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    receiverText: {
        color: 'white',
        fontSize: 16,
    },
})

export default Message
