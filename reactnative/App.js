import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import LoginComponent from './view/login/LoginComponent';
import { PaperProvider } from 'react-native-paper';
import SignUpComponent from './view/signup/SignUpComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './view/login/LoginScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="LoginComponent" component={LoginComponent} />
        <Stack.Screen name="SignUpComponent" component={SignUpComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;