import React from 'react'
import { View, StyleSheet} from "react-native"
import ContainerLoginSignup from "../StyledComponents/ContainerLoginSignup"
import TopHeadingLoginSignup from '../SharedComponents/TopHeadingLoginSignup'
import TopNavLoginSignup from '../SharedComponents/TopNavLoginSignup'
import BottomSignInNavigation from './BottomSignInNavigation'
import FormLoginSignUp from '../SharedComponents/FormLoginSignUp'
import { ScrollView } from 'react-native-gesture-handler'

const LoginScreen = () => {
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