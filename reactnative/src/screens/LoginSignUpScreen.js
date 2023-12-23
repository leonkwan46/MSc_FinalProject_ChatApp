import React from 'react'
import { View, StyleSheet} from 'react-native'
import { ContainerLoginSignup, TopHeadingLoginSignup, TopNavLoginSignup, FormLoginSignUp } from '../components/SharedComponents'
import BottomSignInNavigation from '../components/login/BottomSignInNavigation'
import SignUpAs from '../components/signUp/SignUpAs'

const LoginSignUpScreen = (props) => {
    const isSignUp = props.route?.params?.isSignIn
    const isLogin = props.route?.params?.isLogin
    return (
        <ContainerLoginSignup>
            <TopNavLoginSignup isLogin />
            <View style={ styles.container }>
                <TopHeadingLoginSignup isLogin={!isSignUp} />
                { isSignUp ? <SignUpAs /> : null }
                <FormLoginSignUp isSignUp={isSignUp} />
                { isLogin ? <BottomSignInNavigation isLogin /> : null }
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

export default LoginSignUpScreen