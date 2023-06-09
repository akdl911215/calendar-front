import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList} from '../../App';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

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
  createdAt: number;
  updatedAt: number | null;
  deletedAt: number | null;
}>;

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 3;
const GAP = width / 30;

const TodoList: React.FC<TodoListProps> = () => {
  const [apiInitialState, setApiInitialState] = useState<TodoType[]>([
    {
      id: '1',
      date: 0,
      todo: '가족들이랑 식사',
      done: false,
      authorId: '8654f7b1-d588-4c2b-87a3-124365f13cc1',
      year: 2023,
      month: 1,
      day: 1,
      createdAt: 0,
      updatedAt: null,
      deletedAt: null,
    },
    {
      id: '2',
      date: 0,
      todo: '앱 개발',
      done: false,
      authorId: '8654f7b1-d588-4c2b-87a3-124365f13cc1',
      year: 2023,
      month: 1,
      day: 1,
      createdAt: 0,
      updatedAt: null,
      deletedAt: null,
    },
    {
      id: '3',
      date: 0,
      todo: '미술관 가기',
      done: false,
      authorId: '8654f7b1-d588-4c2b-87a3-124365f13cc1',
      year: 2023,
      month: 1,
      day: 1,
      createdAt: 0,
      updatedAt: null,
      deletedAt: null,
    },
    {
      id: '4',
      date: 0,
      todo: '베트남 가기',
      done: false,
      authorId: '8654f7b1-d588-4c2b-87a3-124365f13cc1',
      year: 2023,
      month: 1,
      day: 1,
      createdAt: 0,
      updatedAt: null,
      deletedAt: null,
    },
    {
      id: '5',
      date: 1685329441086,
      todo: '학교 가기',
      done: false,
      authorId: '8654f7b1-d588-4c2b-87a3-124365f13cc1',
      year: 2023,
      month: 1,
      day: 1,
      createdAt: 0,
      updatedAt: null,
      deletedAt: null,
    },
    {
      id: '6',
      date: 0,
      todo: '학원 가기',
      done: false,
      authorId: '8654f7b1-d588-4c2b-87a3-124365f13cc1',
      year: 2023,
      month: 1,
      day: 1,
      createdAt: 0,
      updatedAt: null,
      deletedAt: null,
    },
    {
      id: '7',
      date: 1685329441086,
      todo: '월요일에 가기',
      done: false,
      authorId: '8654f7b1-d588-4c2b-87a3-124365f13cc1',
      year: 2023,
      month: 1,
      day: 1,
      createdAt: 0,
      updatedAt: null,
      deletedAt: null,
    },
    {
      id: '8',
      date: 1685329441086,
      todo: '화요일에 가기',
      done: false,
      authorId: '8654f7b1-d588-4c2b-87a3-124365f13cc1',
      year: 2023,
      month: 1,
      day: 1,
      createdAt: 0,
      updatedAt: null,
      deletedAt: null,
    },
    {
      id: '9',
      date: 1685329441086,
      todo: '수요일에 가기',
      done: false,
      authorId: '8654f7b1-d588-4c2b-87a3-124365f13cc1',
      year: 2023,
      month: 1,
      day: 1,
      createdAt: 0,
      updatedAt: null,
      deletedAt: null,
    },
    {
      id: '10',
      date: 1685329441086,
      todo: '지옥에 가기',
      done: false,
      authorId: '8654f7b1-d588-4c2b-87a3-124365f13cc1',
      year: 2023,
      month: 1,
      day: 1,
      createdAt: 0,
      updatedAt: null,
      deletedAt: null,
    },
    {
      id: '11',
      date: 1685329441086,
      todo: '수요일에 가기',
      done: false,
      authorId: '8654f7b1-d588-4c2b-87a3-124365f13cc1',
      year: 2023,
      month: 1,
      day: 1,
      createdAt: 0,
      updatedAt: null,
      deletedAt: null,
    },
  ]);

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
    setMonth(5);
    setCurrentTimeStamp(1685329441085);
  }, []);
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
    backgroundColor: '#FFFFFF',
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
  todoListRowText: {fontSize: 18, padding: 5},
});

export default TodoList;
