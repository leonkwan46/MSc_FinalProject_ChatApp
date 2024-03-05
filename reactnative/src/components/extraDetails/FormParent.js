import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import { Box, VStack } from '@react-native-material/core'
import { getRegisteringUser } from '../../redux/stateHelper'
import { useDispatch } from 'react-redux'
import { authInvitationCode } from '../../redux/reducer/authSlice'
import { Button, TextInput, Typography } from '../../compLib'

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
                            <Typography size='lg' color='secondary'>Your teacher has sent you an Invitation Code.</Typography>
                        </Box>
                        <Box>
                            <Typography size='lg' color='secondary'>Please check your email</Typography>
                        </Box>
                        <Box>
                            <TextInput
                                onChangeText={handleChange('invitationCode')}
                                onBlur={handleBlur('invitationCode')}
                                value={values.invitationCode}
                                size='lg'
                                hasError={errors.invitationCode && touched.invitationCode ? true : false}
                                placeholder='Invitation Code'
                                keyboardType='numeric'
                            />
                        </Box>
                        <Box style={styles.buttonContainer}>
                            <Button color='primary' size='xl' onPress={handleSubmit}>
                                <Typography>Submit</Typography>
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
        flex: 1,
        marginTop: 50,
    },
    buttonContainer: {
        alignItems: 'flex-end',
    },
})

export default FormParent