import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { getUserToken } from '../../redux/selectors'
import Contact from './Contact'
import { Box, VStack } from '@react-native-material/core'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { getContacts } from '../../redux/reducer/sessionSlice'
import { combineContacts } from '../../helpers/generalHelpers'

const ContactList = () => {
    const dispatch = useDispatch()
    const token = getUserToken()
    const [allContacts, setAllContacts] = useState([])
    
    const fetchContacts = async () => {
        const response = await dispatch(getContacts({ token }))
        console.log('response', response.payload)
        const combineAllContacts = combineContacts(response.payload)
        console.log('combineAllContacts', combineAllContacts)
        setAllContacts(combineAllContacts)
    }

    useFocusEffect(
        useCallback(() => {
            fetchContacts()
        }, [])
    )

    console.log('allContacts', allContacts)
    return (
        <>
            {allContacts.length > 0 && (
                <View style={styles.container}>
                    <VStack spacing={10} divider={true}>
                        {allContacts.map((contact) => (
                            <Box key={contact?._id}>
                                <Contact contactData={contact} />
                            </Box>
                        ))}
                    </VStack>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    divider: {
        padding: 10,
        backgroundColor: 'white',
        color: 'white',
    },
})

export default ContactList
