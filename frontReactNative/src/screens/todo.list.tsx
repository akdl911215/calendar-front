import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList} from '../../App';
import React, {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';

type TodoListProps = BottomTabScreenProps<RootBottomTabParamList, '할일'>;
export interface TodoType {
  id: string;
  date: number;
  todo: string;
  done: boolean;
}

const TodoList: React.FC<TodoListProps> = () => {
  // api 보내서 응답기준으로 날짜 처리 기준으로 배열 담기
  const currentTimeStamp: number = new Date().getTime();
  console.log('currentTimeStamp : ', currentTimeStamp);
  const apiTodoList: TodoType[] = [
    {id: '', date: 0, todo: '가족들이랑 식사', done: false},
    {id: '', date: 0, todo: '앱 개발', done: false},
    {id: '', date: 0, todo: '미술관 가기', done: false},
  ];

  const TodoListTypeArr: TodoType[] = [];
  const [previous, setPrevious] = useState(TodoListTypeArr);
  const [subsequent, setSubsequent] = useState(TodoListTypeArr);
  useEffect(() => {
    const previousArr = [];
    const subsequentArr = [];
    for (let i = 0; i < apiTodoList.length; ++i) {
      if (apiTodoList[i].date < currentTimeStamp) {
        previousArr.push(apiTodoList[i]);
      } else {
        subsequentArr.push(apiTodoList[i]);
      }
    }

    setPrevious(previousArr);
    setSubsequent(subsequentArr);
  }, []);

  const viewPrevious = previous.map(type => (
    <TextInput placeholder={type.todo} />
  ));
  const viewSubsequent = subsequent.map(type => (
    <TextInput placeholder={type.todo} />
  ));

  return (
    <View>
      {/*<View>{1}</View>*/}
      <View>{viewPrevious}</View>
      <View>{viewSubsequent}</View>
    </View>
  );
};

export default TodoList;
