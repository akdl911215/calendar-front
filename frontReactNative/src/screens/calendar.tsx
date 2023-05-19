import {View, Text} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {type RootBottomTabParamList} from '../../App';
import CustomizedScrollView from '../..//src/components/customized.scroll.view';

type CalendarProps = BottomTabScreenProps<RootBottomTabParamList, '달력'>;
const Calendar: React.FC<CalendarProps> = () => {
  return (
    <View>
      <CustomizedScrollView>
        <Text>Calendar here!</Text>
      </CustomizedScrollView>
    </View>
  );
};

export default Calendar;
