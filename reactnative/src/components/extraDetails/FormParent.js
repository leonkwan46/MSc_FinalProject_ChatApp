import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Formik } from 'formik'
import { TextInput } from 'react-native'
import { Box, VStack } from '@react-native-material/core'
import { getRegisteringUser } from '../../redux/stateHelper'
import { useDispatch } from 'react-redux'
import { authInvitationCode } from '../../redux/reducer/sessionSlice'

const FormParent = () => {
    const user = getRegisteringUser()
    const dispatch = useDispatch()
    const handleOnSubmit = async (values, { resetForm }) => {
        values = { ...values, token: user.token }
        await dispatch(authInvitationCode(values))
        resetForm()
    }
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ invitationCode: '' }}
                onSubmit={handleOnSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <VStack spacing={50}>
                        <Box>
                            <Text style={styles.text}>Your teacher has sent you an Invitation Code.</Text>
                        </Box>
                        <Box>
                            <Text style={styles.text}>Please check your email</Text>
                        </Box>
                        <Box>
                            <TextInput
                                onChangeText={handleChange('invitationCode')}
                                onBlur={handleBlur('invitationCode')}
                                value={values.invitationCode}
                                style={errors.invitationCode && touched.invitationCode ? styles.errors : styles.inputContainer}
                                placeholder='Invitation Code'
                                keyboardType='numeric'
                                placeholderTextColor={'#aaa'}
                            />
                        </Box>
                        <Box style={styles.buttonContainer}>
                            <Pressable style={styles.buttonSize} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Submit</Text>
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
    textContainer: {
        marginTop: 50,
    },
    text: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Lemon-Regular',
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

export default FormParent