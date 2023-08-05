import {
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSetRecoilState} from 'recoil';
import {userModelState} from '../atoms/users.atoms';
import {Fonts} from '../../assets/fonts/fonts';
import {useEffect, useState} from 'react';
import {InquiryDataAPI} from '../api/user.api';
import {TodoType} from '../screens/todo.list';
import {DATE} from '../_common/get.date';

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 2;
const VIEW_WIDTH = width / 1.3;
const FONT: string = Fonts.BMDOHYEON;

const Profile = () => {
  const [profileMenu, setProfileMenu] = useState<boolean>(true);
  const [customersVoiceMenu, setCustomersVoiceMenu] = useState<boolean>(false);
  const [user, setUser] = useState<TodoType>({
    id: '',
    appId: '',
    nickname: '',
    email: '',
    phone: '',
    date: 0,
    todo: '',
    done: false,
    year: 0,
    month: 0,
    day: 0,
    createdAt: DATE,
    updatedAt: DATE,
    deletedAt: null,
  });

  const setUserModel = useSetRecoilState(userModelState);

  const menuBarButton = (): void => {
    setProfileMenu(!profileMenu);
    setCustomersVoiceMenu(!customersVoiceMenu);
  };

  useEffect(() => {
    InquiryDataAPI()
      .then(res => {
        console.log('res : ', res.data.response);
        setUser(res.data.response as TodoType);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <ScrollView>
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
                color: '#EEEEEE',
              }}
              placeholder="ID"
              placeholderTextColor="#999999"
              value={user.appId}
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
                color: '#EEEEEE',
              }}
              placeholder="Nickname"
              placeholderTextColor="#999999"
              value={user.nickname}
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
                color: '#EEEEEE',
              }}
              placeholder="Phone"
              placeholderTextColor="#999999"
              value={user.phone}
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
              E-mail
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
                color: '#EEEEEE',
              }}
              placeholder="E-mail"
              placeholderTextColor="#999999"
              value={user.email}
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

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <View style={{flex: 1, height: 1, backgroundColor: '#EEEEEE'}} />
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
              개선되면 좋은점을 이야기해요!
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
              placeholder="하고 싶은 이야기!"
              placeholderTextColor="#999999"
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
      </ScrollView>
    </>
  );
};

export default Profile;
