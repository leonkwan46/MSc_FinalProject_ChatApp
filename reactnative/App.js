import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/components/HomeScreen'
import LoginScreen from './src/components/login/LoginScreen'
import SignUpScreen from './src/components/signup/SignUpScreen'
import { Provider } from 'react-redux'
import store from './src/redux/store'

const Stack = createStackNavigator()

const App = () => {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App