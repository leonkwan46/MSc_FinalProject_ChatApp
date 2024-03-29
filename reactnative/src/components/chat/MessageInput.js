import React from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { Button, TextInput, Typography } from '../../compLib'
import { getColor } from '../../helpers/styleHelper'

const MessageInput = ({
    message,
    setMessage,
    handleSendMessage
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer} >
                <TextInput
                    style={styles.textInput}
                    placeholder='Type your message'
                    value={message}
                    onChangeText={setMessage}
                    outline
                />
            </View>
            <View>
                <Pressable onPress={handleSendMessage} style={styles.sendButton}>
                    <Typography size='md'>Send</Typography>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#555',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    textInputContainer: {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        padding: 10,
    },
    textInput: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    sendButton: {
        backgroundColor: getColor('primary'),
        padding: 15,
        borderRadius: 10,
    }
})

export default MessageInput