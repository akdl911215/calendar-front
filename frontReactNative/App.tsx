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
  RouteProp,
  useTheme,
} from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Calendar from './src/screens/calendar';
import Home from './src/screens/home';
import {SvgIcon} from './src/components/svg.icon';

export type RootBottomTabParamList = Readonly<{
  Home: undefined;
  Calendar: undefined;
}>;
type handleBottomTabRoute = (props: {
  route: RouteProp<RootBottomTabParamList, keyof RootBottomTabParamList>;
  navigation: any;
}) => BottomTabNavigationOptions;

const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();

function App(): JSX.Element {
  const isDark = useColorScheme() === 'dark';
  const {colors} = useTheme();
  const handleBottomTabRoute: handleBottomTabRoute = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      // focused 속성 사용하여 해당 탭 클릭시 아이콘 변경 가능
      if (route.name === 'Calendar')
        return (
          <SvgIcon name="calendar" width={size} height={size} fill={color} />
        );
    },
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <BottomTab.Navigator screenOptions={handleBottomTabRoute}>
          <BottomTab.Screen name="Home" component={Home} />
          <BottomTab.Screen name="Calendar" component={Calendar} />
        </BottomTab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
