import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import DashboardScreen from '../screens/DashboardScreen';
import UserMapTrackerScreen from '../screens/UserMapTrackerScreen';
import HistoryScreen from '../screens/HistoryScreen';
import MedicineReminderScreen from '../screens/MedicineReminderScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Tracking" component={UserMapTrackerScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Medicine Reminder" component={MedicineReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}