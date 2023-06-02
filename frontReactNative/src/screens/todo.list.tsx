import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList} from '../../App';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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
  // const currentTimeStamp: number = new Date().getTime();
  const [month, setMonth] = useState<number>(1);
  const [currentTimeStamp, setCurrentTimeStamp] = useState<number>(1);
  console.log('currentTimeStamp : ', currentTimeStamp);

  useEffect(() => {
    setMonth(5);
    setCurrentTimeStamp(1685329441085);
  }, []);

  const apiTodoList: TodoType[] = [
    {id: '1', date: 0, todo: '가족들이랑 식사', done: false},
    {id: '2', date: 0, todo: '앱 개발', done: false},
    {id: '3', date: 0, todo: '미술관 가기', done: false},
    {id: '4', date: 0, todo: '베트남 가기', done: false},
    {id: '5', date: 1685329441086, todo: '학교 가기', done: false},
    {id: '6', date: 0, todo: '학원 가기', done: false},
    {id: '7', date: 1685329441086, todo: '월요일에 가기', done: false},
    {id: '8', date: 1685329441086, todo: '화요일에 가기', done: false},
    {id: '9', date: 1685329441086, todo: '수요일에 가기', done: false},
    {id: '7', date: 1685329441086, todo: '월요일에 가기', done: false},
    {id: '8', date: 1685329441086, todo: '화요일에 가기', done: false},
    {id: '9', date: 1685329441086, todo: '수요일에 가기', done: false},
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
    <TextInput
      placeholder={type.todo}
      style={{fontSize: 25, padding: 10}}
      editable={false}
      selectTextOnFocus={false}
    />
  ));
  const viewSubsequent = subsequent.map(type => (
    <TextInput
      placeholder={type.todo}
      style={{fontSize: 25, padding: 10}}
      editable={false}
      selectTextOnFocus={false}
    />
  ));

  const [checkBoxColor, setCheckBoxColor] = useState<boolean>(false);

  return (
    <View>
      <View>
        <Text style={{fontSize: 25}}>{month}월 중에 할 일</Text>
        <ScrollView
          style={{
            width,
            height: VIEW_HEIGHT,
            backgroundColor: '#FFFFFF',
          }}>
          <View style={{width, backgroundColor: '#FFFFFF'}}>
            {viewPrevious.map(el => {
              {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      borderColor: 'black',
                      borderWidth: 1,
                      height: 50,
                    }}>
                    <CheckBox />
                    <View>{el}</View>
                  </View>
                );
              }
            })}
          </View>
        </ScrollView>
      </View>
      <View>
        <Text style={{fontSize: 25}}>{month}월 중에 지난 일</Text>
        <ScrollView
          style={{
            width,
            height: VIEW_HEIGHT,
            backgroundColor: '#FFFFFF',
          }}>
          <View style={{width, backgroundColor: '#FFFFFF'}}>
            {viewSubsequent.map(el => {
              {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      borderColor: 'black',
                      borderWidth: 1,
                      height: 50,
                    }}>
                    <CheckBox
                      disabled={false}
                      value={checkBoxColor}
                      tintColors={{true: 'blue'}}
                      onValueChange={() => setCheckBoxColor(!checkBoxColor)}
                    />
                    <View>{el}</View>
                  </View>
                );
              }
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   title: {fontSize: 25},
//   previousContainer: {
//     width,
//     height: VIEW_HEIGHT,
//     backgroundColor: '#FFFFFF',
//   },
//   previousContent: {width, height: 100, backgroundColor: '#FFFFFF'},
//   subsequentContainer: {
//     width,
//     height: VIEW_HEIGHT,
//     backgroundColor: '#FFFFFF',
//   },
//   subsequentContent: {
//     width,
//     height: VIEW_HEIGHT / 2,
//     backgroundColor: '#FFFFFF',
//   },
//   viewTextInputLists: {fontSize: 25, padding: 10},
// });

export default TodoList;
