import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { HomeScreen, LoginSignUpScreen, ExtraDetailsScreen, ChatScreen, ContactScreen } from './src/screens'
import { Provider } from 'react-redux'
import store from './src/redux/store'

const Stack = createStackNavigator()

const App = () => {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='ContactScreen' component={ContactScreen} />
          <Stack.Screen name='HomeScreen' component={HomeScreen} />
          <Stack.Screen name='LoginSignUpScreen' component={LoginSignUpScreen} />
          <Stack.Screen name='ChatScreen' component={ChatScreen} />
          <Stack.Screen name='ExtraDetailsScreen' component={ExtraDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App