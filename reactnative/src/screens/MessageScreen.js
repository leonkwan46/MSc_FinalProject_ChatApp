import React from 'react'
import ChatMessageList from '../components/chat/ChatMessageList'
import TopHeading from '../components/SharedComponents/TopHeading'
import { LoggedInContainer } from '../components/SharedComponents'
import { ScrollView } from 'react-native'

const MessageScreen = () => {

    return (
        <LoggedInContainer>
            <ScrollView>
                <TopHeading title='Messages' />
                <ChatMessageList />
            </ScrollView>
        </LoggedInContainer>
    )
}

export default MessageScreen
