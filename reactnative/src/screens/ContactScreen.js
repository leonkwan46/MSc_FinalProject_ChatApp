import React from 'react'
import { ScrollView } from 'react-native'
import TopHeading from '../components/SharedComponents/TopHeading'
import ContactList from '../components/contact/ContactList'
import { LoggedInContainer } from '../components/SharedComponents'
import AddBadge from '../components/contact/AddBadge'
import { getLoggedInUser } from '../redux/selectors'

const ContactScreen = () => {
  const { role } = getLoggedInUser()

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
