import { View, Text, Pressable, TextInput, StyleSheet } from "react-native"
import { VStack, Box } from "@react-native-material/core"
import { Formik } from 'formik'
import axios from 'axios'

const FormLoginSignUp = (props) => {

    const isSignUp = (props.page === 'signup' ? true : false)

    return (
        <View style={ styles.container }>
            <Formik
                initialValues={{ username: '', password: '', confirmPassword: '' }}
                onSubmit={ async (values) => {
                    console.log(values)
                    try {
                        await axios.post('http://localhost:5000/login', values)
                    } catch (err) {
                        console.log(err)
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (

                    <VStack spacing={20}>
                        <Box>
                            <TextInput 
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                style={styles.inputContainer}
                                placeholder="Username"
                                placeholderTextColor={'#aaa'}
                            />
                        </Box>
                        <Box>
                            <TextInput
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={styles.inputContainer}
                                placeholder="Password"
                                placeholderTextColor={'#aaa'}
                            />
                        </Box>
                        {isSignUp ? 
                            <Box>
                                <TextInput
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    style={styles.inputContainer}
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
})

export default FormLoginSignUp