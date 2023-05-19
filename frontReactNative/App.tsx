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
  RouteProp,
  useTheme,
} from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Calendar from './src/screens/calendar';
import Profile from './src/screens/profile';
import {SvgIcon} from './src/components/svg.icon';
import TodoList from './src/screens/todo.list';

export type RootBottomTabParamList = {
  달력: undefined;
  할일: undefined;
  내정보: undefined;
};
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
      if (route.name === '달력')
        return (
          <SvgIcon name="calendar" width={size} height={size} fill={color} />
        );
    },
    headerShown: false,
  });
  const str = 'Hello Box';

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <View style={styles.commonBox}>
        <View style={styles.advertisingBox}>
          <Text>{str}</Text>
        </View>
      </View>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <BottomTab.Navigator screenOptions={handleBottomTabRoute}>
          <BottomTab.Screen name="달력" component={Calendar} />
          <BottomTab.Screen name="할일" component={TodoList} />
          <BottomTab.Screen name="내정보" component={Profile} />
        </BottomTab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  advertisingBox: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    height: 50,
    width: '100%',
  },
  commonBox: {
    height: 50,
    width: '100%',
  },
});

export default App;
