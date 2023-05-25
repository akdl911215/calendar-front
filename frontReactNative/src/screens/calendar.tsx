import React from 'react';
import {View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {type RootBottomTabParamList} from '../../App';
import CustomizedScrollView from 'components/customized.scroll.view';

type CalendarProps = BottomTabScreenProps<RootBottomTabParamList, '달력'>;

const monthNames = Array.from({length: 12}).map(
  (item, index) => `${index + 1}월`,
);
const dayNames = ['월', '화', '수', '목', '금', '토', '일'];

LocaleConfig.locales['kr'] = {
  monthNames,
  monthNamesShort: monthNames,
  dayNames,
  dayNamesShort: dayNames,
  today: '오늘',
};

LocaleConfig.defaultLocale = 'kr';

const CalendarScreen: React.FC<CalendarProps> = () => {
  const [selected, setSelected] = React.useState('');

  return (
    <View>
      <CustomizedScrollView>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: 'orange',
            },
          }}
        />
      </CustomizedScrollView>
    </View>
  );
};

export default CalendarScreen;
