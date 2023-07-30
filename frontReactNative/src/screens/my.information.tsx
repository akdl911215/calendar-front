import {View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {type RootBottomTabParamList} from '../../App';
import SignIn from '../components/sign.in';
import Profile from '../components/profile';
import {useRecoilValue} from 'recoil';
import {userModelState} from '../atoms/users.atoms';

type MyInformationProps = BottomTabScreenProps<
  RootBottomTabParamList,
  '내정보'
>;

const MyInformation: React.FC<MyInformationProps> = () => {
  const usersModel = useRecoilValue(userModelState);
  const modelLengthZero: number = Object.keys(usersModel).length;
  return <View>{modelLengthZero === 0 ? <SignIn /> : <Profile />}</View>;
};

export default MyInformation;
