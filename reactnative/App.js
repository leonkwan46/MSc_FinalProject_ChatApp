import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, LoginSignUpScreen, ExtraDetailsScreen, ChatScreen, ContactScreen, MessageScreen } from './src/screens'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { SCREEN_NAMES } from './src/helpers/generalHelpers'
import BottomNavBar from './src/components/SharedComponents/loggedIn/BottomNavBar'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const LoggedInTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={navigation => <BottomNavBar navigation={navigation} />}
    >
      <Tab.Screen name={SCREEN_NAMES.MESSAGE} component={MessageScreen} />
      <Tab.Screen name={SCREEN_NAMES.CONTACT} component={ContactScreen} />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <Provider store={store} >
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREEN_NAMES.HOME} component={HomeScreen} />
            <Stack.Screen name='LoggedInTabs' component={LoggedInTabs} options={{gestureEnabled: false}} />
            <Stack.Screen name={SCREEN_NAMES.EXTRA_DETAILS} component={ExtraDetailsScreen} options={{gestureEnabled: false}} />
            <Stack.Screen name={SCREEN_NAMES.LOGIN_REGISTER} component={LoginSignUpScreen} />
            <Stack.Screen name={SCREEN_NAMES.CHAT} component={ChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  )
}

export default App