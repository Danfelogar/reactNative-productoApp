import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';

LogBox.ignoreLogs(['react-native-gesture-handler']);
//JSX.Element singular y JSX.Element[] plurarl
const AppState = ({ children }: { children : JSX.Element | JSX.Element[] }) => {
  return(
    <AuthProvider>
      { children }
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App;
