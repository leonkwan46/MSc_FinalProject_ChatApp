import { View, Text, Pressable, TextInput, StyleSheet } from "react-native"
import { VStack, Box } from "@react-native-material/core"
import { Formik } from 'formik'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../redux/reducer/authSlice"
import * as Yup from 'yup'

const FormLoginSignUp = (props) => {

    const isSignUp = (props.page === 'signup' ? true : false)
    const dispatch = useDispatch()
    
    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    return (
        <View style={ styles.container }>
            <Formik
                initialValues={{ username: '', password: '', confirmPassword: '' }}
                validationSchema={SignupSchema}
                onSubmit={ async (values) => {
                    console.log(values)
                    // if (isSignUp) {
                    //     console.log('Register')
                    //     const response = await axios.post('http://localhost:5000/signup', {
                    //         username: values.username,
                    //         password: values.password
                    //     })
                    //     dispatch(login(response.data))
                    // } else {
                    //     console.log('Login')
                    //     const response = await axios.post('http://localhost:5000/login', {
                    //         username: values.username,
                    //         password: values.password
                    //     })
                    //     dispatch(login(response.data))
                    // }
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