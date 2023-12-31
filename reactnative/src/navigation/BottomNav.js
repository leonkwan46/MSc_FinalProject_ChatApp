import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from '../screens/HomeScreen'

const Tab = createBottomTabNavigator()

const BottomNav = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomePage} />
            <Tab.Screen name='Login' component={HomePage} />
        </Tab.Navigator>
    )
}

export default BottomNav