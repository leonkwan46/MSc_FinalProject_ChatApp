import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'

const TopNavLoginSignup = (props) => {
    
    const isLogin = (props.page === 'login' ? true : false)

    return (
        <View>
            <Header
                containerStyle = { styles.container }
                leftComponent = { isLogin ? { icon: 'menu', color: '#fff' } : {} }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0,
        height: 100,
        backgroundColor: '',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 30,
    }
})

export default TopNavLoginSignup