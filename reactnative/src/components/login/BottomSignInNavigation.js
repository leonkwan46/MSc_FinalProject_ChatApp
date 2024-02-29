import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Typography } from '../../compLib'

const BottomSignInNavigation = () => {
    
    const navigation = useNavigation()

    const handleOnPress = () => {
        navigation.navigate('LoginSignUpScreen', {isLogin: false})
    }

    return (
        <View style= {styles.container }>
            <Typography>
                <Typography size='md' color='secondary'>Don't have an account? </Typography>
                <View style={ styles.linkContainer }>
                    <Pressable onPress={handleOnPress}>
                        <Typography size='sm' color='secondary'> Sign up!</Typography>
                    </Pressable>
                </View>
            </Typography>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 100,
    },
    linkContainer : {
        borderRadius: 50,
        borderColor: '#D4AF37',
        borderWidth: 1,
        width: 80,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default BottomSignInNavigation