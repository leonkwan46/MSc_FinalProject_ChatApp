import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { setCurrentScreen } from '../redux/reducer/sessionSlice'
import TopHeading from '../components/SharedComponents/TopHeading'
import ContactList from '../components/contact/ContactList'

const ContactScreen = () => {
  const dispatch = useDispatch()
  // Update current screen
  dispatch(setCurrentScreen('CONTACTS'))
  return (
    <View style={styles.container}>
      <TopHeading />
      <ContactList />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
})

export default ContactScreen
