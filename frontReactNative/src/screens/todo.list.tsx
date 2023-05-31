import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList} from '../../App';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

type TodoListProps = BottomTabScreenProps<RootBottomTabParamList, '할일'>;
export type TodoType = Readonly<{
  id: string;
  date: number;
  todo: string;
  done: boolean;
}>;

const TodoList: React.FC<TodoListProps> = () => {
  // api 보내서 응답기준으로 날짜 처리 기준으로 배열 담기
  const DATE = new Date();
  console.log('DATE : ', DATE);
  const apiTodoList: TodoType[] = [
    {id: '', date: 0, todo: '가족들이랑 식사', done: false},
    {id: '', date: 0, todo: '앱 개발', done: false},
    {id: '', date: 0, todo: '미술관 가기', done: false},
  ];

  // const TodoListTypeArr = TodoListType[];
  const [previous, setPrevious] = useState([]);
  const [subsequent, setSubsequent] = useState([]);
  useEffect(() => {
    for (let i = 0; i < apiTodoList.length; ++i) {
      // true > 현재 날짜 기준으로 전
      if (true) {
        //
        // "2021-10-11 10:30:25" < "2021-10-11 10:30:26"
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
