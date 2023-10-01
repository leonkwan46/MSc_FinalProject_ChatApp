import React, { useEffect } from 'react'
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native"
import { VStack, Box } from "@react-native-material/core"
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { loginUser, signUpUser } from '../../../redux/reducer/authSlice'
import { openStatusOverlay } from '../../../redux/reducer/signUpInfoSlice'
import { useNavigation } from '@react-navigation/native'

const FormLoginSignUp = (props) => {
    const navigation = useNavigation()
    const isSignUp = (props.page === 'signup' ? true : false)
    const dispatch = useDispatch()
    const role = useSelector((state) => state.signUpInfo.role)

    // Validation Schema
    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    return (
        <View style={ styles.container }>
            <Formik
                initialValues={{ username: 'qwe', password: 'qwe', confirmPassword: 'qwe', role: role }}
                validationSchema={isSignUp ? SignupSchema : null}
                onSubmit={ async (values, { resetForm }) => {
                    if (isSignUp) {
                        dispatch(signUpUser(values)).then(() => {
                            res.payload.token ? navigation.navigate('HomeScreen') : dispatch(openStatusOverlay())
                        })
                    } else {
                        dispatch(loginUser(values)).then((res) => {
                            res.payload.token ? navigation.navigate('HomeScreen') : dispatch(openStatusOverlay())
                        })
                    }
                    resetForm()
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

                    <VStack spacing={20}>
                        <Box>
                            <TextInput 
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                style={errors.username && touched.username ? styles.errors : styles.inputContainer}
                                placeholder="Username"
                                placeholderTextColor={'#aaa'}
                            />
                        </Box>
                        <Box>
                            <TextInput
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={errors.password && touched.password ? styles.errors : styles.inputContainer}
                                placeholder="Password"
                                placeholderTextColor={'#aaa'}
                            />
                        </Box>
                        {isSignUp ? 
                            <Box>
                                <TextInput
                                    secureTextEntry={true}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    style={errors.confirmPassword && touched.confirmPassword ? styles.errors : styles.inputContainer}
                                    placeholder="Confirm Password"
                                    placeholderTextColor={'#aaa'}
                                />
                            </Box>
                            : null
                        }
                        <Box style={styles.buttonContainer}>
                            <Pressable onPress={handleSubmit} style={styles.buttonSize}>
                                {isSignUp ? 
                                    <Text style={styles.buttonText}>Register</Text> :
                                    <Text style={styles.buttonText}>Login</Text>
                                }
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
        borderRadius: 10,
        margin: 10,
    },
    inputContainer: {
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 10,
        padding: 10,
        fontSize: 14,
        fontFamily: 'Lemon-Regular',
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    buttonSize: {
        height: 50,
        width: '60%',
        backgroundColor: '#D4AF37',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Lemon-Regular',
    },
    errors: {
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 10,
        padding: 10,
        fontSize: 14,
        fontFamily: 'Lemon-Regular',
        borderColor: 'red',
        borderWidth: 1,
    }
})

export default FormLoginSignUp