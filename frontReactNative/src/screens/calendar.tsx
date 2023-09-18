/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Text,
} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {Calendar} from 'react-native-calendars';
import {type RootBottomTabParamList} from '../../App';
import ToDo from 'components/to.do';
import CalendarModal from 'components/calendar.modal';
import {useKeyboard} from 'hooks/useKeyboard';
import TodoViewModal from 'components/todo.view.modal';
import {CalendarListAPI} from '../api/calendar.api';
import {DATE} from '../_common/get.date';
import {Fonts} from '../../assets/fonts/fonts';

const FONT: string = Fonts.BMDOHYEON;
type CalendarProps = BottomTabScreenProps<RootBottomTabParamList, '달력'>;

const {width, height} = Dimensions.get('window');
const monthNames = Array.from({length: 12}).map(
  (item, index) => `${index + 1}월`,
);
const dayNames = ['월', '화', '수', '목', '금', '토', '일'];

const CalendarScreen: React.FC<CalendarProps> = () => {
  const [selected, setSelected] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<TodoType>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [dayArray, setDayArray] = useState([
    {
      id: '',
      author_id: '',
      date: '',
      todo: '',
      done: false,
      month: 0,
      day: 0,
      created_at: DATE,
      updated_at: DATE,
      deleted_at: null,
    },
  ]);
  const TodoListTypeArr: TodoType[] = [];
  const [todoListArr, setTodoListArr] = useState<TodoType[]>(TodoListTypeArr);

  const {isKeyboardVisible, keyboardHeight} = useKeyboard();

  useEffect(() => {
    CalendarListAPI()
      .then(res => {
        if (!res?.data?.response?.inquiryList)
          Alert.alert('해당 일자에 데이터를 불러오지 못했습니다.');

        console.log('res : ', res.data.response.inquiryList);
        setDayArray(res.data.response.inquiryList);
      })
      .catch(err => console.log('err : ', err));
  }, []);

  return (
    <View
      style={[
        styles.container,
        {marginTop: isKeyboardVisible ? -keyboardHeight / 3 : 0},
      ]}>
      {/* <Calendar /> */}
      <Calendar
        onDayPress={day => {
          console.log('day : ', day);

          setSelected(day.dateString);
          // setIsModalVisible(true);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'orange',
          },
        }}
      />
      {todoListArr.length === 0 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            top: height / 2 / 5,
          }}>
          <Text
            style={{
              fontFamily: FONT,
              alignSelf: 'center',
              fontSize: 20,
              color: 'white',
            }}>
            할일을 찾을 수 없어요
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.to_do_list}
          data={dayArray}
          renderItem={({item}) => (
            <ToDo
              key={item.id}
              todo={item}
              setSelectedTodo={setSelectedTodo}
              setIsModalVisible={setIsViewModalVisible}
            />
          )}
        />
      )}

      {/*<CalendarModal*/}
      {/*  isModalVisible={isModalVisible}*/}
      {/*  setIsModalVisible={setIsModalVisible}*/}
      {/*  selected={selected}*/}
      {/*/>*/}
      {selectedTodo ? (
        <TodoViewModal
          setIsModalVisible={setIsViewModalVisible}
          isModalVisible={isViewModalVisible}
          selected={selectedTodo}
        />
      ) : null}
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
