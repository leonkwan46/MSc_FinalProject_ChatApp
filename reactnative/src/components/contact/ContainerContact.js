import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { TopHeading } from '../SharedComponents'
import ContactList from './ContactList'
import { getUserContacts, getUserRole } from '../../redux/selectors'
import AddBadge from './AddBadge'
import { useFocusEffect } from '@react-navigation/native'
import { getContacts } from '../../redux/reducer/sessionSlice'

const ContainerContact = () => {
    const role = getUserRole()

    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <TopHeading title='Contact' />
                    <ContactList />
                </ScrollView>
            </SafeAreaView>
            { !(role === 'student') && <AddBadge />}
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

export default ContainerContact
