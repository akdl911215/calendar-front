import React from 'react';
import {FlatList, View, StyleSheet, Dimensions} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {type RootBottomTabParamList} from '../../App';
// import CustomizedScrollView from 'components/customized.scroll.view';
import {TodoType} from './todo.list';
import ToDo from 'components/to.do';
import CalendarModal from 'components/calendar.modal';

type CalendarProps = BottomTabScreenProps<RootBottomTabParamList, '달력'>;

const {width} = Dimensions.get('window');

const monthNames = Array.from({length: 12}).map(
  (item, index) => `${index + 1}월`,
);
const dayNames = ['월', '화', '수', '목', '금', '토', '일'];
const apiTodoList: TodoType[] = [
  {id: '0', date: 0, todo: '가족들이랑 식사', done: false},
  {id: '1', date: 0, todo: '앱 개발', done: false},
  {id: '2', date: 0, todo: '미술관 가기', done: false},
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
  const [selected, setSelected] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  return (
    <View style={styles.container}>
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
            id={item.id}
            date={item.date}
            done={item.done}
            todo={item.todo}
          />
        )}
      />
      <CalendarModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selected={selected}
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
