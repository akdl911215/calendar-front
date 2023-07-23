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
import {DATE_MONTH} from '../_common/get.date';
import {useRecoilValue} from 'recoil';
import {userModelState} from '../atoms/users.atoms';
import {useIsFocused} from '@react-navigation/native';

type TodoListProps = BottomTabScreenProps<RootBottomTabParamList, '할일'>;
export type TodoType = Readonly<{
  id: string;
  authorId: string;
  date: number;
  todo: string;
  done: boolean;
  year: number;
  month: number;
  day: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}>;

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 3;
const GAP = width / 30;

const TodoList: React.FC<TodoListProps> = () => {
  const isFocused = useIsFocused();
  const [apiInitialState, setApiInitialState] = useState<TodoType[]>([]);
  // const usersModel = useRecoilValue(userModelState);

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
      setMonth(5);
      setCurrentTimeStamp(1685329441085);

      // TodoListInquiryAPI()
      //   .then(res => setApiInitialState(res.data.response.inquiryList))
      //   .catch(err => console.error(err));

      console.log('TodoListAPI start');
      TodoListAPI(DATE_MONTH)
        .then(res => console.log('res : ', res))
        .catch(err => console.error(err));
    }
  }, [isFocused]);

  // useEffect(() => {
  //   console.log('TodoListAPI start');
  //   TodoListAPI(DATE_MONTH)
  //     .then(res => console.log(res))
  //     .catch(err => console.error(err));
  // }, [usersModel]);

  useEffect(() => {
    const previousArr = [];
    const subsequentArr = [];

    for (let i = 0; i < apiInitialState.length; ++i) {
      if (apiInitialState[i].date < currentTimeStamp) {
        previousArr.push(apiInitialState[i]);
      } else {
        subsequentArr.push(apiInitialState[i]);
      }
    }

    setPrevious(previousArr);
    setSubsequent(subsequentArr);
  }, [apiInitialState]);

  const rowChangeFunc = ({
    done,
    date,
    index,
  }: {
    done: boolean;
    date: number;
    index: number;
  }) => {
    if (currentTimeStamp > date) {
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
        </View>
      </View>
      <View>
        <Text style={styles.title}>{month}월 중에 지난 일</Text>
        <View style={styles.todoListRowContainer}>
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
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {fontSize: 25},
  todoListRowContainer: {
    width,
    backgroundColor: '#FFFAFA',
    height: VIEW_HEIGHT,
  },
  todoListRow: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    gap: GAP,
  },
  todoListRowText: {fontSize: 18, padding: 5, borderColor: '#ffffcc'},
});

export default TodoList;
