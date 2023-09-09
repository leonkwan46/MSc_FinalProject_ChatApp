import React from 'react'
import { View, StyleSheet } from "react-native"
import BackgroundImageContainer from "../../StyledComponents/BackgroundImageContainer"
import TopHeadingLoginSignup from '../../SharedComponents/TopHeadingLoginSignup'
import TopNavLoginSignup from '../../SharedComponents/TopNavLoginSignup'
import BottomSignInNavigation from './BottomSignInNavigation'
import FormLoginSignUp from '../../SharedComponents/FormLoginSignUp'

const LoginScreen = () => {
    return (
        <BackgroundImageContainer>
            <View style={ styles.backgroundColor }>
                <TopNavLoginSignup />
                <View style={ styles.container }>
                    <TopHeadingLoginSignup page='login' />
                    <FormLoginSignUp page='login' />
                    <BottomSignInNavigation />
                </View>
            </View>
        </BackgroundImageContainer>
    )
}

const styles = StyleSheet.create({
    backgroundColor: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        paddingTop: '20%',
    },
    container: {
        flex: 1,
        margin: 30,
    },
  })

export default LoginScreen