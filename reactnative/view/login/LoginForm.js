import { View, Text, Button, TextInput } from "react-native";
import { Formik } from 'formik';
import axios from 'axios';

const LoginForm = () => {
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={ async (values) => {
                console.log(values)
                try {
                    await axios.post('http://localhost:5000/login', values);
                } catch (err) {
                    console.log(err);
                }
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <TextInput 
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                    />
                    <TextInput
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />
                    <Button onPress={handleSubmit} title="Submit" />
                </View>
            )}
        </Formik>
    );
}

export default LoginForm;