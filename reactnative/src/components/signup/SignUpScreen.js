import React from 'react'
import { View, StyleSheet } from "react-native"
import { ContainerLoginSignup, TopHeadingLoginSignup, TopNavLoginSignup, FormLoginSignUp } from "../SharedComponents"
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