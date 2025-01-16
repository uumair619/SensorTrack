
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeModules } from 'react-native';
const { LocationServiceModule } = NativeModules;
export default function App() {

  return (<GestureHandlerRootView >
    <AppNavigator />
  
  </GestureHandlerRootView>);
  
 
}