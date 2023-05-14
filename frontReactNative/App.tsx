/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Calendar from './src/screens/calendar';
import Home from './src/screens/home';

export type RootBottomTabParamList = {
  Home: undefined;
  Calendar: undefined;
};

const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();

function App(): JSX.Element {
  const isDark = useColorScheme() === 'dark';
  const {colors} = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <BottomTab.Navigator screenOptions={{headerShown: false}}>
          <BottomTab.Screen name="Home" component={Home} />
          <BottomTab.Screen name="Calendar" component={Calendar} />
        </BottomTab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
