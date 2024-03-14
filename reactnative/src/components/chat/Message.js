import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Typography } from '../../compLib'

const Message = ({
    messageData
}) => {
    console.log('=========messageData===========')
    console.log(messageData.item)
    const { message, senderId, roomId } = messageData.item
    const user = useSelector(state => state.session.user)
    const isSender = user.userId === senderId
    return (
        <View style={ isSender ? styles.senderContainer : styles.receiverContainer }>
            <Typography extrasStyle={ isSender ? styles.senderText : styles.receiverText }>{ message }</Typography>
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
