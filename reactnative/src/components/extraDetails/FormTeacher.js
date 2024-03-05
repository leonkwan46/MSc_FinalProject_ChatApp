import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { getRegisteringUser } from '../../redux/stateHelper'
import { Formik } from 'formik'
import UploadDocument from './UploadDocument'
import { Box, VStack } from '@react-native-material/core'
import { updateTeacherDocuments } from '../../redux/reducer/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Button, Typography } from '../../compLib'

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
                        <Typography size='lg'>Enhanced DBS Cert</Typography>
                        <UploadDocument title="Choose file" setSelectedDocument={setSelectedDBS} selectedDocument={selectedDBS} />
                    </Box>
                    <Box>
                        <Typography size='lg'>Proof of ID</Typography>
                        <UploadDocument title="Choose file" setSelectedDocument={setSelectedID} selectedDocument={selectedID} />
                    </Box>
                    <Box>
                        <Typography size='lg'>Professional Qualification Cert</Typography>
                        <UploadDocument title="Choose file" setSelectedDocument={setSelectedProfessionalCert} selectedDocument={selectedProfessionalCert} />
                    </Box>
                    <Box style={styles.buttonContainer}>
                        <Button onPress={handleSubmit} color='primary' size='xl' >
                            <Typography>Complete</Typography>
                        </Button>
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
        marginTop: 30,
    },
    buttonContainer: {
        alignItems: 'flex-end',
    },
})

export default FormTeacher