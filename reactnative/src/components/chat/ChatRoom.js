import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setCurrentChatRoom } from '../../redux/reducer/sessionSlice'
import { joinRoom } from '../../helpers/socketHelpers'
import { Typography } from '../../compLib'
import ChatRoomGroupImage from './ChatRoomGroupImage'

const ChatRoom  = ({ roomData }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handleOnPress = async () => {
        await joinRoom(roomData._id)
        dispatch(setCurrentChatRoom(roomData))
        navigation.navigate('ChatScreen')
    }
    return (
        <View>
            <Pressable
                onPress={handleOnPress}
                style={({ pressed }) => [
                    { backgroundColor: pressed ? '#333' : '#000' },
                    styles.pressableContainer,
                ]}
            >
                <View style={styles.container}>
                    <ChatRoomGroupImage />
                    <Typography color='secondary'>{roomData.name}</Typography>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    pressableContainer: {
        borderRadius: 10,
        padding: 5,
    },
})

export default ChatRoom
