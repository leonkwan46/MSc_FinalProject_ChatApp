import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import { getColor } from '../../../helpers/styleHelper'
import { SCREEN_NAMES } from '../../../helpers/generalHelpers'

const NavIcon = ({ name, screen, selectedIcon, onPress }) => {
    return (
        <Icon
            name={name}
            size={30}
            type='font-awesome'
            onPress={() => onPress(screen)}
            color={selectedIcon === screen ? 'white' : 'black'}
        />
    )
}

const BottomNavBar = () => {
    const navigation = useNavigation()
    const [selectedIcon, setSelectedIcon] = useState('MESSAGE')

    const handleOnPress = (screen) => {
        setSelectedIcon(screen)
        const screenName = SCREEN_NAMES[Object.keys(SCREEN_NAMES).find((item) => item === screen)]
        navigation.navigate(screenName)
    }

    return (
        <View style={styles.container}>
            <NavIcon name='address-book' screen='CONTACT' selectedIcon={selectedIcon} onPress={handleOnPress} />
            <NavIcon name='comments' screen='MESSAGE' selectedIcon={selectedIcon} onPress={handleOnPress} />
            {/* Me no time do */}
            <NavIcon name='gear' screen='SETTING' selectedIcon={selectedIcon} onPress={() => {}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        height: '10%',
        backgroundColor: getColor('primary'),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
})

export default BottomNavBar