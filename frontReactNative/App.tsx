/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Calendar from './src/screens/calendar';
import TodoList from './src/screens/todo.list';
import Profile from './src/screens/profile';

export type RootBottomTabParamList = {
  달력: undefined;
  할일: undefined;
  내정보: undefined;
};

const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();

function App(): JSX.Element {
  const isDark = useColorScheme() === 'dark';
  const {colors} = useTheme();
  const str = 'Hello Box';
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}>
        <View style={styles.advertisingBox}>
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#FFFFFF',
              height: 100,
              width: 380,
            }}>
            <Text>{str}</Text>
          </View>
        </View>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <BottomTab.Navigator screenOptions={{headerShown: false}}>
            <BottomTab.Screen name="달력" component={Calendar} />
            <BottomTab.Screen name="할일" component={TodoList} />
            <BottomTab.Screen name="내정보" component={Profile} />
          </BottomTab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  advertisingBox: {
    height: 100,
    width: 100,
  },
});

export default App;
