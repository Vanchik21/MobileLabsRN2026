import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GameProvider } from './src/GameContext';
import HomeScreen from './src/screens/HomeScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';

const Tab = createBottomTabNavigator();

const lightTheme = { background: '#ffffff', text: '#000000' };
const darkTheme = { background: '#121212', text: '#ffffff' };

export default function App() {
  const scheme = useColorScheme(); 

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <ThemeProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
          <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
              <Tab.Screen name="Gesture Clicker" component={HomeScreen} />
              <Tab.Screen name="Challenges" component={ChallengesScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </GameProvider>
    </GestureHandlerRootView>
  );
}