/* eslint-disable react-native/no-inline-styles */
import {useState} from 'react';
import {FlatList, View, StyleSheet, Dimensions} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
// import {Calendar} from 'components/Calendar/Calendar';
import {Calendar} from 'react-native-calendars';
import {type RootBottomTabParamList} from '../../App';
import ToDo from 'components/to.do';
import CalendarModal from 'components/calendar.modal';
import {useKeyboard} from 'hooks/useKeyboard';
import TodoViewModal from 'components/todo.view.modal';
import {todoMockList} from '_common/todo.mock.data';

type CalendarProps = BottomTabScreenProps<RootBottomTabParamList, '달력'>;

const {width} = Dimensions.get('window');
const monthNames = Array.from({length: 12}).map(
  (item, index) => `${index + 1}월`,
);
const dayNames = ['월', '화', '수', '목', '금', '토', '일'];
// const monthNames = Array.from({length: 12}).map(
//   (item, index) => `${index + 1}월`,
// );
// const dayNames = ['월', '화', '수', '목', '금', '토', '일'];

// LocaleConfig.locales.kr = {
//   monthNames,
//   monthNamesShort: monthNames,
//   dayNames,
//   dayNamesShort: dayNames,
//   today: '오늘',
// };

// LocaleConfig.defaultLocale = 'kr';

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
        {marginTop: isKeyboardVisible ? -keyboardHeight / 3 : 0},
      ]}>
      {/* <Calendar /> */}
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
        data={todoMockList}
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
