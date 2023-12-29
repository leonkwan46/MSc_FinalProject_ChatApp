import React, { useEffect } from 'react'
import { View, StyleSheet} from 'react-native'
import { ContainerLoginSignup, TopNavLoginSignup, FormLoginSignUp } from '../components/SharedComponents'
import BottomSignInNavigation from '../components/login/BottomSignInNavigation'
import SignUpAs from '../components/register/SignUpAs'
import { setCurrentScreen } from '../redux/reducer/sessionSlice'
import { useDispatch } from 'react-redux'
import TopHeading from '../components/SharedComponents/TopHeading'

const LoginSignUpScreen = (props) => {
    const isLogin = props.route?.params?.isLogin
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCurrentScreen({ title: (isLogin ? 'LOGIN' : 'REGISTER') }))
    }, [isLogin])
    return (
        <ContainerLoginSignup>
            <TopNavLoginSignup isLogin />
            <View style={ styles.container }>
                <TopHeading />
                { !isLogin ? <SignUpAs /> : null }
                <FormLoginSignUp isLogin={isLogin} />
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