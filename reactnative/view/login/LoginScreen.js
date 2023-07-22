import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('LoginComponent')}
      />
    </View>
  );
};

export default LoginScreen;
