// AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './(tabs)/index';
import OnboardingScreen from './(tabs)/OnboardingScreen';
import MovieScreen from './(tabs)/MovieScreen';
import SongScreen from './(tabs)/SongScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="MovieScreen" component={MovieScreen} />
        <Stack.Screen name="SongScreen" component={SongScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
