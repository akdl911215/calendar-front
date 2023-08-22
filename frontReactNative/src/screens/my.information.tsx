import {View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {type RootBottomTabParamList} from '../../App';
import SignIn from '../components/sign.in';
import {useRecoilValue} from 'recoil';
import {userModelState, userSignUpModelState} from '../atoms/users.atoms';
import MyPage from '../components/my.page';
import SignUp from '../components/sign.up';

type MyInformationProps = BottomTabScreenProps<
  RootBottomTabParamList,
  '내정보'
>;

const MyInformation: React.FC<MyInformationProps> = () => {
  const usersModel = useRecoilValue(userModelState);
  const modelLengthZero: number = Object.keys(usersModel).length;
  const signUpModel: boolean = useRecoilValue(userSignUpModelState);
  return (
    <View>
      {modelLengthZero !== 0 ? (
        <MyPage />
      ) : signUpModel === false ? (
        <SignIn />
      ) : (
        <SignUp />
      )}
    </View>
  );
};

export default MyInformation;
