import React from 'react'
import { useDispatch } from 'react-redux'
import ContainerMessages from '../components/chat/ContainerMessages'
import TopHeading from '../components/SharedComponents/TopHeading'
import { useNavigation } from '@react-navigation/native'
import { LoggedInContainer } from '../components/SharedComponents'

const MessageScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    return (
        <LoggedInContainer>
            <TopHeading title='Messages' />
            <ContainerMessages />
        </LoggedInContainer>
    )
}

export default MessageScreen
