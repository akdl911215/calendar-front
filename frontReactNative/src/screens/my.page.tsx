import {View, Text} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {type RootBottomTabParamList} from '../../App';
import SignIn from '../components/sign.in';
import {useState} from 'react';

type MyInformationProps = BottomTabScreenProps<
  RootBottomTabParamList,
  '내정보'
>;

const MyPage: React.FC<MyInformationProps> = () => {
  const [state, setState] = useState<boolean>(true);
  return <View>{state === true ? <SignIn /> : null}</View>;
};

export default MyPage;
