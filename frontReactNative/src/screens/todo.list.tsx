import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList} from '../../App';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

type TodoListProps = BottomTabScreenProps<RootBottomTabParamList, '할일'>;
interface TodoListType {
  date: Date;
  todoList: string;
}

const TodoList: React.FC<TodoListProps> = () => {
  // api 보내서 응답기준으로 날짜 처리 기준으로 배열 담기
  const DATE = new Date();
  console.log('DATE : ', DATE);
  const apiTodoList: TodoListType[] = [
    {date: new Date(), todoList: '가족들이랑 식사'},
    {date: new Date(), todoList: '앱 개발'},
    {date: new Date(), todoList: '미술관 가기'},
  ];

  // const TodoListTypeArr = TodoListType[];
  const [previous, setPrevious] = useState([]);
  const [subsequent, setSubsequent] = useState([]);
  useEffect(() => {
    for (let i = 0; i < apiTodoList.length; ++i) {
      // true > 현재 날짜 기준으로 전
      if (true) {
        //
      } else {
        //
      }
    }
  }, []);

  return (
    <View>
      <Text>Calendar here!</Text>
      <Text>DATE</Text>
    </View>
  );
};

export default TodoList;
