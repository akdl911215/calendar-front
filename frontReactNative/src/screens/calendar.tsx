import {View, Text} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {type RootBottomTabParamList} from '../../App';

type CalendarProps = BottomTabScreenProps<RootBottomTabParamList, 'Calendar'>;
const Calendar: React.FC<CalendarProps> = () => {
  return (
    <View>
      <Text>Calendar here!</Text>
    </View>
  );
};

export default Calendar;
