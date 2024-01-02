import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { getUser } from '../../redux/stateHelper'
import { Formik } from 'formik'
import UploadDocument from './UploadDocument'
import { Box, VStack } from '@react-native-material/core'

const initialValues = {}

const FormTeacher = () => {
    const user = getUser()
    const [selectedDBS, setSelectedDBS] = useState(null)
    const [selectedDegree, setSelectedDegree] = useState(null)

    const handleOnSubmit = async () => {
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
                        <Text style={styles.docTitle}>DBS Cert</Text>
                        <UploadDocument title="Choose DBS Cert" setSelectedDocument={setSelectedDBS} selectedDocument={selectedDBS} />
                    </Box>
                    <Box>
                        <Text style={styles.docTitle}>Degree Cert</Text>
                        <UploadDocument title="Choose Degree Cert" setSelectedDocument={setSelectedDegree} selectedDocument={selectedDegree} />
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