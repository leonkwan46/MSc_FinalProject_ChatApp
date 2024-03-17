import React, { useEffect, useState } from 'react'
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

const BottomNavBar = (props) => {
    const navigation = useNavigation()
    // This is used because we are using Tab.Screen
    const currentScreen = props.navigation.state.routeNames[props.navigation.state.index]

    const [selectedIcon, setSelectedIcon] = useState('MESSAGE')

    const handleOnPress = (screen) => {
        setSelectedIcon(screen)
        navigation.navigate(screen)
    }

    useEffect(() => {
        setSelectedIcon(currentScreen)
      }, [currentScreen])

    return (
        <View style={styles.container}>
            <NavIcon name='address-book' screen={SCREEN_NAMES.CONTACT} selectedIcon={selectedIcon} onPress={handleOnPress} />
        <NavIcon name='comments' screen={SCREEN_NAMES.MESSAGE} selectedIcon={selectedIcon} onPress={handleOnPress} />
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