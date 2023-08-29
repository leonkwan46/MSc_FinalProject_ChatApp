import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LoginForm from '../components/login/LoginForm';

const LoginCard = () => {
    return (
      <View style={styles.card}>
        <LoginForm />
      </View>
    );
}

const styles = StyleSheet.create({
  card: {
      borderRadius: 10,
      height: '100%',
      margin: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default LoginCard;