import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import TopHeading from '../components/SharedComponents/TopHeading'
import ContactList from '../components/contact/ContactList'
import { useNavigation } from '@react-navigation/native'
import { LoggedInContainer } from '../components/SharedComponents'
import AddBadge from '../components/contact/AddBadge'

const ContactScreen = () => {
  const navigation = useNavigation()

  // Not allowing users to swipe back
  useEffect(() => {
    navigation.setOptions({ gestureEnabled: false })
  }, [])
  return (
    <LoggedInContainer>
      <ScrollView>
        <TopHeading title='Contact' />
        <ContactList />
      </ScrollView>
      <AddBadge />
    </LoggedInContainer>
  )
}

export default ContactScreen
