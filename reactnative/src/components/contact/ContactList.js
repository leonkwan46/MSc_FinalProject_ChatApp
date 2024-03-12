import React from 'react'
import { StyleSheet, View } from 'react-native'
import { getUserContacts } from '../../redux/selectors'
import Contact from './Contact'
import { Box, VStack } from '@react-native-material/core'

const ContactList = () => {
    const contacts = getUserContacts()
    const allContacts = []
    for (const [key, value] of Object.entries(contacts)) {
        if (!key || !value) continue
        allContacts.push(value)
    }
    return (
        <View>
            {allContacts && (
                <View style={styles.container}>
                    <VStack spacing={10} divider={true}>
                        {allContacts.map((contact) => (
                            <Box key={contact[0]._id}>
                                <Contact contactData={contact} />
                            </Box>
                        ))}
                    </VStack>
                </View>
            )}
        </View>
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
