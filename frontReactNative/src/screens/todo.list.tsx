import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList} from '../../App';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

type TodoListProps = BottomTabScreenProps<RootBottomTabParamList, '할일'>;
export interface TodoType {
  id: string;
  date: number;
  todo: string;
  done: boolean;
}
const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 3;

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

  const colorArr = ['red', 'blue', 'green', 'grey'];

  return (
    <View>
      <View>
        <Text style={styles.title}>해야할 일</Text>
        <View style={styles.previousContainer}>
          <View style={styles.previousContent}>
            {viewPrevious.map((el, key: number) => {
              {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      backgroundColor: colorArr[key],
                    }}>
                    <CheckBox
                      // style={{width: 20, height: 20}}
                      disabled={false}
                    />
                    <View>{el}</View>
                  </View>
                );
              }
            })}
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.title}>지난 일</Text>
        <View style={styles.subsequentContainer}>
          <View style={styles.subsequentContent}>
            {viewSubsequent.map(el => {
              {
                return (
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <CheckBox style={{flex: 1}} disabled={false} />
                    <View style={{flex: 1}}>{el}</View>
                  </View>
                );
              }
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {fontSize: 25},
  previousContainer: {
    width,
    height: VIEW_HEIGHT,
    backgroundColor: '#FFFFFF',
  },
  previousContent: {width, height: VIEW_HEIGHT / 2, backgroundColor: '#FFFFFF'},
  subsequentContainer: {
    width,
    height: VIEW_HEIGHT,
    backgroundColor: '#FFFFFF',
  },
  subsequentContent: {
    width,
    height: VIEW_HEIGHT / 2,
    backgroundColor: '#FFFFFF',
  },
});

export default TodoList;
