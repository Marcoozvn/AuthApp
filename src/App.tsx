import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import { AuthProvider } from './contexts/auth'
import Routes from './routes'


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: '#F2F2F2'}}>
          <Routes />
        </SafeAreaView>
      </AuthProvider>
    </NavigationContainer>
  );
}