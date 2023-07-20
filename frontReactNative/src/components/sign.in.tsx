import {
  Alert,
  Dimensions,
  Linking,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useState} from 'react';
import {SignInDataAPI} from '../api/user.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSetRecoilState} from 'recoil';
import {userModelState} from '../atoms/users.atoms';

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 2.2;
const VIEW_WIDTH = width / 1.3;

interface UserType {
  readonly id: string;
  readonly appId: string;
  readonly nickname: string;
  readonly phone: string;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: null | Date;
}

const SignIn = () => {
  const [signIn, setSignIn] = useState({
    appId: '',
    password: '',
  });
  const {appId, password} = signIn;
  const setUserModel = useSetRecoilState(userModelState);

  const handleChange = (event: {name: string; value: string}): void => {
    const {name, value} = event;

    setSignIn({
      ...signIn,
      [name]: value.toLowerCase(),
    });
  };

  const signInButton = async () => {
    if (appId === '' || password === '') {
      Alert.alert('아이디 또는 비밀번호를 입력해주세요.');
      return;
    }

    const {data} = await SignInDataAPI(signIn);

    try {
      const {response} = data;
      const userJsonResponse: UserType = response;
      setUserModel(userJsonResponse);

      const at: string = userJsonResponse.accessToken;
      const rt: string = userJsonResponse.refreshToken;

      await AsyncStorage.setItem('access_token', at);
      await AsyncStorage.setItem('refresh_token', rt);
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          height: '100%',
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#ffffff',
            width: VIEW_WIDTH,
            height: VIEW_HEIGHT,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
          }}>
          <Text
            style={{
              paddingVertical: 24,
              fontSize: 27,
              fontStyle: 'normal',
              fontWeight: '400',
              letterSpacing: 0.2,
              color: '#29a19c',
            }}>
            Login
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
              gap: 6,
              width: 200,
              height: 150,
            }}>
            <View style={{width: '100%'}}>
              <TextInput
                style={{
                  borderWidth: 1,
                  width: '100%',
                  height: 40,
                  borderRadius: 4,
                  paddingLeft: 3,
                }}
                placeholder="아이디를 입력하세요."
                onChangeText={value => handleChange({name: 'appId', value})}
              />
            </View>
            <View style={{width: '100%'}}>
              <TextInput
                style={{
                  borderWidth: 1,
                  width: '100%',
                  height: 40,
                  borderRadius: 4,
                  paddingLeft: 3,
                }}
                textContentType="password"
                placeholder="비밀번호를 입력하세요."
                secureTextEntry={true}
                onChangeText={value => handleChange({name: 'password', value})}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Pressable
                // onPress={() => Alert.alert('Login Button pressed')}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? 'white' : 'rgb(210, 230, 255)',
                  },
                  {
                    borderRadius: 8,
                    padding: 6,
                  },
                ]}
                onPress={signInButton}>
                {({pressed}) => (
                  <Text>{pressed ? '로그인 중...' : '로그인'}</Text>
                )}
              </Pressable>
            </View>
            <View>
              <Text style={{fontSize: 12}}>
                Don't have an account?
                <Text
                  style={{color: 'blue'}}
                  onPress={() => Linking.openURL('')}>
                  Sign up
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              <View>
                <Text style={{width: 50, textAlign: 'center'}}>SNS</Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default SignIn;
