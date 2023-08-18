import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import {RootBottomTabParamList} from '../../App';
import {TodoListAPI} from '../api/todo.list.api';
import {DATE_DAY, DATE_MONTH} from '../_common/get.date';
import {useIsFocused} from '@react-navigation/native';
import {Fonts} from '../../assets/fonts/fonts';

type TodoListProps = BottomTabScreenProps<RootBottomTabParamList, '할일'>;

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 3;
const GAP = width / 30;
const FONT: string = Fonts.BMDOHYEON;

const TodoList: React.FC<TodoListProps> = () => {
  const isFocused = useIsFocused();
  const [apiInitialState, setApiInitialState] = useState<TodoType[]>([]);

  const TodoListTypeArr: TodoType[] = [];
  const [previous, setPrevious] = useState<TodoType[]>(TodoListTypeArr);
  const [subsequent, setSubsequent] = useState<TodoType[]>(TodoListTypeArr);
  const [month, setMonth] = useState<number>(1);
  const [currentTimeStamp, setCurrentTimeStamp] = useState<number>(1);
  interface renderItemType {
    item: TodoType;
    index: number;
  }

  useEffect(() => {
    if (isFocused === true) {
      const previousArr: TodoType[] = [];
      const subsequentArr: TodoType[] = [];

      const apiMonth: number = apiInitialState[0]?.month;
      const MONTH: number = apiMonth === undefined ? DATE_MONTH : apiMonth;

      setMonth(MONTH);
      setCurrentTimeStamp(DATE_DAY);

      TodoListAPI(MONTH)
        .then(res => {
          const apiArr: TodoType[] = res.data.response.monthList;
          setApiInitialState(apiArr);
          console.log('apiArr : ', apiArr);

          for (let i = 0; i < apiArr.length; ++i) {
            const apiDay: number = apiArr[i].day;
            if (apiDay <= currentTimeStamp) {
              previousArr.push(apiArr[i]);
            } else {
              subsequentArr.push(apiArr[i]);
            }
          }

          setPrevious(previousArr);
          setSubsequent(subsequentArr);
          console.log('previousArr : ', previousArr);
          console.log('subsequentArr : ', subsequentArr);
        })
        .catch(err => console.error(err));
    }
  }, [isFocused]);

  const rowChangeFunc = ({
    done,
    date,
    index,
  }: {
    done: boolean;
    date: Date;
    index: number;
  }) => {
    const localDate = new Date(date);
    const time = localDate.getTime();
    if (currentTimeStamp > time) {
      const newState = [...previous];
      newState[index] = {...previous[index], done};

      setPrevious(newState);
    } else {
      const newState = [...subsequent];
      newState[index] = {...subsequent[index], done};

      setSubsequent(newState);
    }
  };

  return (
    <View>
      <View>
        <Text style={styles.title}>{month}월 중에 할 일</Text>
        <View style={styles.todoListRowContainer}>
          {previous.length === 0 ? (
            <View style={styles.todoListEmptyBox}>
              <Text style={styles.todoListEmptyText}>
                할일을 찾을 수 없어요
              </Text>
            </View>
          ) : (
            <FlatList
              data={previous}
              renderItem={({item, index}: renderItemType) => (
                <TouchableOpacity style={styles.todoListRow}>
                  <CheckBox
                    value={previous[index].done}
                    onValueChange={(value: boolean) =>
                      rowChangeFunc({
                        done: value,
                        date: item.date,
                        index,
                      })
                    }
                  />
                  <Text style={styles.todoListRowText}>{item.todo}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
      <View>
        <Text style={styles.title}>{month}월 중에 지난 일</Text>
        <View style={styles.todoListRowContainer}>
          {subsequent.length === 0 ? (
            <View style={styles.todoListEmptyBox}>
              <Text style={styles.todoListEmptyText}>
                할일을 찾을 수 없어요
              </Text>
            </View>
          ) : (
            <FlatList
              data={subsequent}
              renderItem={({item, index}: renderItemType) => (
                <TouchableOpacity style={styles.todoListRow}>
                  <CheckBox
                    value={subsequent[index].done}
                    onValueChange={(value: boolean) =>
                      rowChangeFunc({
                        done: value,
                        date: item.date,
                        index,
                      })
                    }
                  />
                  <Text style={styles.todoListRowText}>{item.todo}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {fontSize: 25, fontFamily: FONT, color: '#EEEEEE'},
  todoListRowContainer: {
    width,
    backgroundColor: '#1E1E1E',
    height: VIEW_HEIGHT,
  },
  todoListRow: {
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    height: 50,
    borderBottomColor: '#EEEEE',
    borderBottomWidth: 1,
    gap: GAP,
  },
  todoListRowText: {
    fontSize: 18,
    padding: 5,
    borderColor: '#EEEEEE',
    fontFamily: FONT,
    color: '#EEEEEE',
  },
  todoListEmptyBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoListEmptyText: {
    fontFamily: FONT,
    alignSelf: 'center',
    fontSize: 20,
    color: 'black',
  },
});

export default TodoList;
