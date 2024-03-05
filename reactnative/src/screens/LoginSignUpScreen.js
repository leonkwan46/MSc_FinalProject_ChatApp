import React from 'react'
import { StyleSheet, ScrollView} from 'react-native'
import { ContainerLoginSignup, FormLoginSignUp } from '../components/SharedComponents'
import BottomSignInNavigation from '../components/login/BottomSignInNavigation'
import SignUpAs from '../components/register/SignUpAs'
import TopHeading from '../components/SharedComponents/TopHeading'

const LoginSignUpScreen = (props) => {
    const isLogin = props.route?.params?.isLogin

    return (
        <ContainerLoginSignup>
            <ScrollView contentContainerStyle={ styles.container }>
                <TopHeading title={isLogin ? 'Login' : 'Register'} />
                { !isLogin ? <SignUpAs /> : null }
                <FormLoginSignUp isLogin={isLogin} />
                { isLogin ? <BottomSignInNavigation isLogin /> : null }
            </ScrollView>
        </ContainerLoginSignup>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        display: 'flex',
        justifyContent: 'center',
    },
  })

export default LoginSignUpScreen