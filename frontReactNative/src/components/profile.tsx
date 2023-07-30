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
  const [profileMenu, setProfileMunu] = useState<boolean>(true);
  const [customersVoiceMenu, setCustomersVoiceMenu] = useState<boolean>(false);

  const setUserModel = useSetRecoilState(userModelState);

  const profileMenuBarButton = (): void => {
    setProfileMunu(!profileMenu);
    setCustomersVoiceMenu(!customersVoiceMenu);
  };

  const customersVoiceMenuBarButton = (): void => {
    setProfileMunu(!profileMenu);
    setCustomersVoiceMenu(!customersVoiceMenu);
  };
  return (
    <>
      <View
        style={{
          display: 'flex',
          backgroundColor: '#cccccc',
          height: '100%',
        }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            height: height / 17,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View style={{backgroundColor: profileMenu ? 'red' : '#ffffff'}}>
            <Text
              onPress={profileMenuBarButton}
              style={{
                paddingTop: 5,
                fontSize: 20,
                letterSpacing: 0.4,
                color: '#29a19c',
                fontFamily: FONT,
              }}>
              Profile
            </Text>
          </View>
          <View>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? 'red' : '#ffffff',
                },
                {borderRadius: 8, padding: 6},
              ]}
              onPress={customersVoiceMenuBarButton}>
              <Text
                style={{
                  // paddingTop: 5,
                  fontSize: 20,
                  letterSpacing: 0.4,
                  color: '#29a19c',
                  fontFamily: FONT,
                }}>
                고객의 소리함
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default Profile;
