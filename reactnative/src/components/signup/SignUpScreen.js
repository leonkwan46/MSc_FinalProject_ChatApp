import React from 'react'
import { View, StyleSheet, ScrollView } from "react-native"
import ContainerLoginSignup from "../StyledComponents/ContainerLoginSignup"
import TopHeadingLoginSignup from '../SharedComponents/TopHeadingLoginSignup'
import TopNavLoginSignup from '../SharedComponents/TopNavLoginSignup'
import FormLoginSignUp from '../SharedComponents/FormLoginSignUp'
import SignUpAs from './SignUpAs'

const SignUpScreen = () => {

    return (
        <ContainerLoginSignup>
            <TopNavLoginSignup />
            <View style={ styles.container }>
                <TopHeadingLoginSignup page='signup' />
                <SignUpAs />
                <FormLoginSignUp page='signup' />
            </View>
        </ContainerLoginSignup>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
  })

export default SignUpScreen