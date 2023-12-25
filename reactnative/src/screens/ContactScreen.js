import React from 'react'
import { View } from 'react-native'
import ContainerContact from '../components/contact/ContainerContact'
import { useDispatch } from 'react-redux'
import { setCurrentScreen } from '../redux/reducer/sessionSlice'

const ContactScreen = () => {
  const dispatch = useDispatch()
  // Update current screen
  dispatch(setCurrentScreen('CONTACTS'))
  return (
    <View>
        <ContainerContact />
    </View>
  )
}

export default ContactScreen
