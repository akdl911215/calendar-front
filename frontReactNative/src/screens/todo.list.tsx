import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList} from '../../App';
import React from 'react';
import {Text, View} from 'react-native';

type TodoListProps = BottomTabScreenProps<RootBottomTabParamList, '할일'>;

const TodoList: React.FC<TodoListProps> = () => {
  return (
    <View>
      <Text>Calendar here!</Text>
    </View>
  );
};

export default TodoList;
