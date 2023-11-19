import React from "react"
import { Text, View, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

const BottomSignInNavigation = () => {
    
    const navigation = useNavigation()

    const handleOnPress = () => {
        navigation.navigate('LoginSignUpScreen', {isSignIn: true})
    }

    return (
        <View style= {styles.container }>
            <Text>
                <Text style={ styles.text }>Don't have an account? </Text>
                <View style={ styles.linkContainer }>
                    <Pressable onPress={handleOnPress}>
                        <Text style={ styles.linkText }> Sign up!</Text>
                    </Pressable>
                </View>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 100,
    },
    text: {
        fontFamily: 'Lemon-Regular',
        fontSize: 16,
        color: 'white',
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
    linkText: {
        fontFamily: 'Lemon-Regular',
        fontSize: 16,
        color: '#D4AF37',
    }
})
export default BottomSignInNavigation