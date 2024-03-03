import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { getRegisteringUser } from '../../redux/stateHelper'
import { Formik } from 'formik'
import UploadDocument from './UploadDocument'
import { Box, VStack } from '@react-native-material/core'
import { updateTeacherDocuments } from '../../redux/reducer/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const initialValues = {}

const FormTeacher = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const user = getRegisteringUser()
    const { userId } = user
    const [selectedDBS, setSelectedDBS] = useState(null)
    const [selectedID, setSelectedID] = useState(null)
    const [selectedProfessionalCert, setSelectedProfessionalCert] = useState(null)

    const handleOnSubmit = async () => {
        const result = await dispatch(updateTeacherDocuments({ userId, selectedDBS, selectedID, selectedProfessionalCert }))
        if (!result.error) navigation.navigate('MessageScreen')
    }
        
    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleOnSubmit}
            >
            {({ handleSubmit }) => (
                <VStack spacing={20}>
                    <Box>
                        <Text style={styles.docTitle}>Enhanced DBS Cert</Text>
                        <UploadDocument title="Choose file" setSelectedDocument={setSelectedDBS} selectedDocument={selectedDBS} />
                    </Box>
                    <Box>
                        <Text style={styles.docTitle}>Proof of ID</Text>
                        <UploadDocument title="Choose file" setSelectedDocument={setSelectedID} selectedDocument={selectedID} />
                    </Box>
                    <Box>
                        <Text style={styles.docTitle}>Professional Qualification Cert</Text>
                        <UploadDocument title="Choose file" setSelectedDocument={setSelectedProfessionalCert} selectedDocument={selectedProfessionalCert} />
                    </Box>
                    <Box style={styles.buttonContainer}>
                        <Pressable onPress={handleSubmit} style={styles.buttonSize}>
                            <Text style={styles.buttonText}>Complete</Text>
                        </Pressable>
                    </Box>
                </VStack>
            )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    docTitle: {
        fontSize: 20,
        fontFamily: 'Lemon-Regular',
    },
    buttonContainer: {
        alignItems: 'flex-end',
    },
    buttonSize: {
        height: 50,
        width: '50%',
        backgroundColor: '#D4AF37',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Lemon-Regular',
        color: '#000'
    }
})

export default FormTeacher