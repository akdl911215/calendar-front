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
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingHorizontal: '10%',
          gap: 10,
        }}>
        <View style={{marginTop: 18, width: '100%', alignItems: 'center'}}>
          <Text
            style={{
              width: '100%',
              textAlign: 'left',
              marginLeft: 15,
              fontSize: 18,
              fontWeight: '600',
              marginVertical: 1,
              fontFamily: FONT,
              color: '#EEEEEE',
            }}>
            ID
          </Text>
          <TextInput
            style={{
              borderWidth: 2,
              width: '100%',
              height: 40,
              borderRadius: 10,
              borderColor: '#999999',
              fontFamily: FONT,
              paddingLeft: 8,
            }}
          />
        </View>
        <View style={{marginTop: 5, width: '100%', alignItems: 'center'}}>
          <Text
            style={{
              width: '100%',
              textAlign: 'left',
              marginLeft: 15,
              fontFamily: FONT,
              fontSize: 18,
              fontWeight: '600',
              marginVertical: 1,
              color: '#EEEEEE',
            }}>
            Nickname
          </Text>
          <TextInput
            style={{
              borderWidth: 2,
              width: '100%',
              height: 40,
              borderRadius: 10,
              borderColor: '#999999',
              paddingLeft: 8,
              fontFamily: FONT,
            }}
          />
        </View>
        <View style={{marginTop: 5, width: '100%', alignItems: 'center'}}>
          <Text
            style={{
              width: '100%',
              textAlign: 'left',
              marginLeft: 15,
              fontSize: 18,
              fontFamily: FONT,
              fontWeight: '600',
              marginVertical: 1,
              color: '#EEEEEE',
            }}>
            Phone
          </Text>
          <TextInput
            style={{
              borderWidth: 2,
              fontFamily: FONT,
              width: '100%',
              height: 40,
              borderRadius: 10,
              borderColor: '#999999',
              paddingLeft: 8,
            }}
          />
        </View>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#999999' : '#CCCCCC',
            },
            {
              borderRadius: 10,
              padding: 6,
            },
          ]}>
          {({pressed}) => (
            <Text style={{fontFamily: FONT, color: '#EEEEEE'}}>
              {pressed ? '전송 중...' : '수정 전송'}
            </Text>
          )}
        </Pressable>
      </View>
    </>
  );
};

export default Profile;
