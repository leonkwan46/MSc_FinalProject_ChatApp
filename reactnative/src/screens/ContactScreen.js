import React from 'react'
import { ScrollView } from 'react-native'
import TopHeading from '../components/SharedComponents/TopHeading'
import ContactList from '../components/contact/ContactList'
import { LoggedInContainer } from '../components/SharedComponents'
import AddBadge from '../components/contact/AddBadge'
import { useSelector } from 'react-redux'

const ContactScreen = () => {
  const { role } = useSelector((state) => state.session.user)

  return (
    <LoggedInContainer>
      <ScrollView>
        <TopHeading title='Contact' />
        <ContactList />
      </ScrollView>
      { !(role === 'student') && <AddBadge />}
    </LoggedInContainer>
  )
}

export default ContactScreen
