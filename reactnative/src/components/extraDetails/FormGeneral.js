import React from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import * as Yup from 'yup'
import { Box, VStack } from '@react-native-material/core'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { updateExtraDetails, updateUser } from '../../redux/reducer/authSlice'

// Validation Schema
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    DoB: Yup.string()
        .required('Required'),
    gender: Yup.string()
        .required('Required'),
})
// For testing
const initialValues = { name: 'Nani', DoB: Date.now(), gender: 'Nani' }
// const initialValues = { name: '', DoB: '', gender: '' }

const FormGeneral = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)

    const onSubmit = (values, { resetForm }) => {
        values = {...values, userId: user.userId }
        dispatch(updateUser(values))
        
        dispatch(updateExtraDetails(values))
        resetForm()
    }

    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <VStack spacing={50}>
                        <Box>
                            <TextInput
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                style={errors.name && touched.name ? styles.errors : styles.inputContainer}
                                placeholder='Name'
                                placeholderTextColor={'#aaa'}
                            />
                        </Box>
                        <Box>
                            <TextInput
                                onChangeText={handleChange('DoB')}
                                onBlur={handleBlur('DoB')}
                                value={values.DoB}
                                style={errors.DoB && touched.DoB ? styles.errors : styles.inputContainer}
                                placeholder='Date of Birth'
                                placeholderTextColor={'#aaa'}
                            />
                        </Box>
                        <Box>
                            <TextInput
                                onChange={handleChange('gender')}
                                onBlur={handleBlur('gender')}
                                value={values.gender}
                                style={errors.gender && touched.gender ? styles.errors : styles.inputContainer}
                                placeholder='Gender'
                                placeholderTextColor={'#aaa'}
                            />
                        </Box>
                        <Box style={styles.buttonContainer}>
                            <Pressable onPress={handleSubmit} style={styles.buttonSize}>
                                <Text style={styles.buttonText}>Next</Text>
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
        flex: 1,
        marginTop: 50,
    },
    inputContainer: {
        backgroundColor: '#fff',
        height: 60,
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
        fontFamily: 'Lemon-Regular',
    },
    errors: {
        backgroundColor: '#fff',
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        fontSize: 20,
        fontFamily: 'Lemon-Regular',
        borderColor: '#f00',
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

export default FormGeneral