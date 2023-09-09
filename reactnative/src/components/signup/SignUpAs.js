import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const SignUpAs = () => {
    const handleOnPress =() => {
        console.log('Sohai')
    }

    return (
        <View style={ styles.borderline }>
            <View style={ styles.container }>
                <View style={styles.textAsContainer}>
                    <Text style={styles.textAs}>As: </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={handleOnPress} style={styles.selectionContainer}>
                        <Text style={styles.text}>Student / Parents</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleOnPress} style={styles.selectionContainer}>
                        <Text style={styles.text}>Teacher</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    borderline: {
        borderWidth: 2,
        borderColor: '#D4AF37',
        borderRadius: 10,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 120,
    },
    selectionContainer: {
        height: '50%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textAsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '20%',
    },
    textAs: {
        fontFamily: 'Lemon-Regular',
        fontSize: '25px',
        color: '#D4AF37',
    },
    text: {
        fontFamily: 'Lemon-Regular',
        fontSize: '20px',
        color: '#D4AF37',
    },
    // Unknown_Problem
    // divider: {
    //     height: 4,
    //     backgroundColor: 'black',
    // },
})
export default SignUpAs