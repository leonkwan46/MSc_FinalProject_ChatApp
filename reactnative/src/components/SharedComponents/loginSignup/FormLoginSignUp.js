import React from 'react'
import { View, StyleSheet } from 'react-native'
import { VStack, Box } from '@react-native-material/core'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthStates, loginUser, signUpUser } from '../../../redux/reducer/authSlice'
import { openStatusOverlay } from '../../../redux/reducer/registerInfoSlice'
import { useNavigation } from '@react-navigation/native'
import { setUser } from '../../../redux/reducer/sessionSlice'
import { LoginSchema, SignupSchema } from '../../../helpers/validationHelpers'
import { Button, TextInput, Typography } from '../../../compLib'

// For testing
// const initialValues = { email: 'lk370.chatapp@gmail.com', password: '123456', confirmPassword: '123456' }
const initialValues = { email: 'teacher@gmail.com', password: 'qwe', confirmPassword: 'qwe' }
// const initialValues = { email: 'student@gmail.com', password: '123456'}
// const initialValues = {}

const FormLoginSignUp = ({
    isLogin
}) => {
    const validationSchema = isLogin ? LoginSchema : SignupSchema
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const role = useSelector(state => state.registerInfo.role)
    const onSubmit = async (values, { resetForm }) => {
        const payload = {...values, role: role}
        // Login Page
        if (isLogin) {
            dispatch(loginUser(payload)).then((res) => {
                console.log('res', res.payload)
                const { token, user } = res.payload
                const { role, isInvitationVerified, isDocVerified, isGeneralFormComplete } = user

                if ((role === 'parent' && (!isInvitationVerified || !isGeneralFormComplete))
                    || (role === 'teacher' && (!isDocVerified || !isGeneralFormComplete))) {
                    return navigation.navigate('ExtraDetailsScreen')
                } else {
                    dispatch(setUser({ user, token }))
                    dispatch(clearAuthStates())
                    token ? navigation.navigate('LoggedInTabs') : dispatch(openStatusOverlay())
                }
            })
        // Register Page
        } else {
            dispatch(signUpUser(payload)).then((res) => {
                const { token } = res.payload
                token ? navigation.navigate('ExtraDetailsScreen') : dispatch(openStatusOverlay())
            })
        }
        resetForm()
    }

    return (
        <View style={ styles.container }>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                // After Submit
                onSubmit={onSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

                    <VStack spacing={20}>
                        <Box>
                            <TextInput 
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                size='lg'
                                hasError={errors.email && touched.email ? true : false}
                                placeholder='Email'
                            />
                        </Box>
                        <Box>
                            <TextInput
                                secureTextEntry
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                size='lg'
                                hasError={errors.password && touched.password ? true : false}
                                placeholder='Password'
                            />
                        </Box>
                        {!isLogin &&
                            <Box>
                                <TextInput
                                    secureTextEntry
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    hasError={errors.confirmPassword || touched.confirmPassword ? true : false}
                                    size='lg'
                                    placeholder='Confirm Password'
                                />
                            </Box>
                        }
                        <Box style={styles.buttonContainer}>
                            <Button onPress={handleSubmit} color='primary' size='xl' >
                                {isLogin ? 
                                    <Typography size='lg'>Login</Typography> :
                                    <Typography size='lg'>Register</Typography>
                                }
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
        borderRadius: 10,
        margin: 10,
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'flex-end',
    },
})

export default FormLoginSignUp