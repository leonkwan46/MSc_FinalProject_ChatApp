import React from 'react'
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native'

const ContainerChatMessage = ({
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
                />
            </View>
            <View style={styles.sendButtonContainer} >
                <Pressable
                    style={styles.sendButton}
                    onPress={handleSendMessage}
                >
                    <Text>Send</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderTopColor: 'grey',
        borderTopWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        borderBlockColor: 'grey',
        borderWidth: 1,
    },
    sendButtonContainer: {
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        width: '20%',
    },
    sendButton: {
        backgroundColor: '#D4AF37',
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
    }
})

export default ContainerChatMessage