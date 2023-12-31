import React from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { getUser } from '../../redux/stateHelper'

const FormTeacher = () => {
    const user = getUser()
    
    return (
        <View>
            <Text>FormTeacher</Text>
        </View>
    )
}

export default FormTeacher