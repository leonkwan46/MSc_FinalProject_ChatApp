import React from 'react'
import { Text, View, StyleSheet } from "react-native"
import LoginForm from "./LoginForm"
import BackgroundImageContainer from "../../StyledComponents/BackgroundImageContainer"
import TopHeadingLoginSignup from '../../SharedComponents/TopHeadingLoginSignup'
import TopNavLoginSignup from '../../SharedComponents/TopNavLoginSignup'
import LoginCard from '../../SharedComponents/LoginCard'
import BottomNav from '../../navigation/BottomNav'

const LoginComponent = () => {
    return (
        <BackgroundImageContainer>
            <View style={ styles.backgroundColor }>
                <TopNavLoginSignup />
                <View style={ styles.container }>
                    <TopHeadingLoginSignup />
                    <View style={ styles.cardContainer }>
                        <LoginCard />
                    </View>
                </View>
                <BottomNav />
            </View>
        </BackgroundImageContainer>
    )
}

const styles = StyleSheet.create({
    backgroundColor: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
    },
    container: {
        flex: 1,
        padding: 30,
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
  });

export default LoginComponent