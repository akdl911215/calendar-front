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

const MyPage: React.FC<MyInformationProps> = () => {
  const usersModel = useRecoilValue(userModelState);
  return <View>{!!usersModel === true ? <Profile /> : <SignIn />}</View>;
};

export default MyPage;
