import React, { useEffect } from 'react'
import { View } from 'react-native'
import { setCurrentScreen } from '../redux/reducer/sessionSlice'
import { useDispatch } from 'react-redux'
import ContainerMessages from '../components/chat/ContainerMessages'
import TopHeading from '../components/SharedComponents/TopHeading'

const MessageScreen = () => {
    const dispatch = useDispatch()
    
    // Update current screen
    useEffect(() => {
        dispatch(setCurrentScreen({ title: 'MESSAGES' }))
    }, [])
    return (
        <View>
            <TopHeading />
            <ContainerMessages />
        </View>
    )
}

export default MessageScreen
