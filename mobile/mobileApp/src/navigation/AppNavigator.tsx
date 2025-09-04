import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import SyncScreen from '../screens/SyncScreen';
import DebugScreen from '../screens/DebugScreen';
import LevelMapScreen from '../screens/games/levels/LevelMapScreen';
import FlashcardScreen from '../screens/games/levels/FlashCardScreen';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Register: undefined;
  ForgotPassword: undefined; // ✅ yeni ekran
  Sync: undefined; // ✅ yeni ekran
  Debug: undefined; // ✅ yeni ekran
  LevelMap: undefined; // ✅ yeni ekran
  FlashCard: { words: any[] }; // ✅ param tipi eklendi
}; // AppNavigator.tsx (veya stack tanımladığın yerde)

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sync">
        <Stack.Screen
          name="Sync"
          component={SyncScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Debug" component={DebugScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FlashCard"
          component={FlashcardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LevelMap"
          component={LevelMapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
