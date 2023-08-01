import {Dimensions, Pressable, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSetRecoilState} from 'recoil';
import {userModelState} from '../atoms/users.atoms';
import {Fonts} from '../../assets/fonts/fonts';
import {useState} from 'react';

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 2;
const VIEW_WIDTH = width / 1.3;
const FONT: string = Fonts.BMDOHYEON;

const Profile = () => {
  const [profileMenu, setProfileMenu] = useState<boolean>(true);
  const [customersVoiceMenu, setCustomersVoiceMenu] = useState<boolean>(false);

  const setUserModel = useSetRecoilState(userModelState);

  const menuBarButton = (): void => {
    setProfileMenu(!profileMenu);
    setCustomersVoiceMenu(!customersVoiceMenu);
  };

  return (
    <>
      <Text>Profile</Text>
    </>
  );
};

export default Profile;
