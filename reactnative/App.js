import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { HomeScreen, LoginSignUpScreen, ExtraDetailsScreen, ChatScreen, ContactScreen, MessageScreen } from './src/screens'
import { Provider } from 'react-redux'
import { persistor } from './src/redux/store'
import store from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'

const Stack = createStackNavigator()



const App = () => {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='ChatScreen' component={ChatScreen} />
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='ExtraDetailsScreen' component={ExtraDetailsScreen} />
            <Stack.Screen name='LoginSignUpScreen' component={LoginSignUpScreen} />
            <Stack.Screen name='ContactScreen' component={ContactScreen} />
            <Stack.Screen name='MessageScreen' component={MessageScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App