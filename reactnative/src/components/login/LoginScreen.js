import React from 'react'
import { View, StyleSheet} from "react-native"
import { ContainerLoginSignup, TopHeadingLoginSignup, TopNavLoginSignup, FormLoginSignUp } from "../SharedComponents"
import BottomSignInNavigation from './BottomSignInNavigation'

const LoginScreen = ({navigation}) => {
    return (
        <ContainerLoginSignup>
            <TopNavLoginSignup />
            <View style={ styles.container }>
                <TopHeadingLoginSignup page='login' />
                <FormLoginSignUp page='login' />
                <BottomSignInNavigation />
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

export default LoginScreen