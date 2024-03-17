import React from 'react'
import { LoggedInContainer } from '../components/SharedComponents'
import ContainerContact from '../components/contact/ContainerContact'

const ContactScreen = () => {

  return (
    <LoggedInContainer>
      <ContainerContact />
    </LoggedInContainer>
  )
}

export default ContactScreen
