import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import LoginComponent from './view/login/LoginComponent';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <View>
      <LoginComponent />
    </View>
  );
};

export default App;