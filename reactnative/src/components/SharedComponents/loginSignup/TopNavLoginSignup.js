import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'

const TopNavLoginSignup = (props) => {
    return (
        <View>
            <Header
                containerStyle = { styles.container }
                leftComponent = { props.isLogin ? { icon: 'arrow-back', color: '#fff' } : { icon: 'menu', color: '#fff' } }
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