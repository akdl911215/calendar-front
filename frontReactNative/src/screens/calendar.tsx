import {useState} from 'react';
import {FlatList, View, StyleSheet, Dimensions} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {type RootBottomTabParamList} from '../../App';
// import CustomizedScrollView from 'components/customized.scroll.view';
import {TodoType} from './todo.list';
import ToDo from 'components/to.do';
import CalendarModal from 'components/calendar.modal';
import {useKeyboard} from 'hooks/useKeyboard';
import TodoViewModal from 'components/todo.view.modal';

type CalendarProps = BottomTabScreenProps<RootBottomTabParamList, '달력'>;

const {width} = Dimensions.get('window');

const monthNames = Array.from({length: 12}).map(
  (item, index) => `${index + 1}월`,
);
const dayNames = ['월', '화', '수', '목', '금', '토', '일'];
const apiTodoList: TodoType[] = [
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
];

LocaleConfig.locales.kr = {
  monthNames,
  monthNamesShort: monthNames,
  dayNames,
  dayNamesShort: dayNames,
  today: '오늘',
};

LocaleConfig.defaultLocale = 'kr';

const CalendarScreen: React.FC<CalendarProps> = () => {
  const [selected, setSelected] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<TodoType>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const {isKeyboardVisible, keyboardHeight} = useKeyboard();

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: isKeyboardVisible ? -keyboardHeight / 3 : 0,
        },
      ]}>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
          setIsModalVisible(true);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'orange',
          },
        }}
      />
      <FlatList
        style={styles.to_do_list}
        data={apiTodoList}
        renderItem={({item}) => (
          <ToDo
            key={item.id}
            todo={item}
            setSelectedTodo={setSelectedTodo}
            setIsModalVisible={setIsViewModalVisible}
          />
        )}
      />
      <CalendarModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selected={selected}
      />
      <TodoViewModal
        setIsModalVisible={setIsViewModalVisible}
        isModalVisible={isViewModalVisible}
        selected={selectedTodo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  to_do_list: {
    flex: 1,
    marginTop: width / 30,
  },
});

export default CalendarScreen;
