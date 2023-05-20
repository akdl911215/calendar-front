import React from 'react';
import {View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {Calendar} from 'react-native-calendars';
import {type RootBottomTabParamList} from '../../App';
import CustomizedScrollView from '../../src/components/customized.scroll.view';

type CalendarProps = BottomTabScreenProps<RootBottomTabParamList, '달력'>;
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
