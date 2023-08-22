import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useState} from 'react';
import {SignInDataAPI} from '../api/user.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSetRecoilState} from 'recoil';
import {userModelState, userSignUpModelState} from '../atoms/users.atoms';
import {Fonts} from '../../assets/fonts/fonts';

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 2.2;
const VIEW_WIDTH = width / 1.3;
const FONT: string = Fonts.BMDOHYEON;

interface UserType {
  readonly id: string;
  readonly app_id: string;
  readonly nickname: string;
  readonly password: string;
  readonly phone: string;
  readonly email: string;
  readonly access_token: string;
  readonly refresh_token: string | null;
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly deleted_at: Date | null;
}

const SignIn = () => {
  const [signIn, setSignIn] = useState({
    appId: '',
    password: '',
  });
  const {appId, password} = signIn;
  const setUserModel = useSetRecoilState(userModelState);
  const setSignUpModel = useSetRecoilState(userSignUpModelState);

  const handleChange = (event: {name: string; value: string}): void => {
    const {name, value} = event;

    setSignIn({
      ...signIn,
      [name]: value.toLowerCase(),
    });
  };

  const signUpButton = async () => setSignUpModel(true);

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

      const at: string = userJsonResponse.access_token;
      const rt: string = userJsonResponse.refresh_token as string;

      await AsyncStorage.setItem('access_token', at);
      await AsyncStorage.setItem('refresh_token', rt);
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.signInBox}>
          <Text style={styles.signInText}>시간을 계획적으로</Text>
          <View style={styles.internalComponentBatch}>
            <View style={styles.idTextViewBox}>
              <TextInput
                style={styles.idTextInputBox}
                placeholder="아이디를 입력하세요."
                placeholderTextColor="#999999"
                onChangeText={value => handleChange({name: 'appId', value})}
              />
            </View>
            <View style={styles.passwordTextViewBox}>
              <TextInput
                style={styles.passwordTextInputBox}
                textContentType="password"
                placeholder="비밀번호를 입력하세요."
                placeholderTextColor="#999999"
                secureTextEntry={true}
                onChangeText={value => handleChange({name: 'password', value})}
              />
            </View>
            <View style={styles.signInClickButton}>
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#999999' : '#CCCCCC',
                  },
                  {
                    borderRadius: 8,
                    padding: 6,
                  },
                ]}
                onPress={signInButton}>
                {({pressed}) => (
                  <Text style={{fontFamily: FONT}}>
                    {pressed ? '로그인 중...' : '로그인'}
                  </Text>
                )}
              </Pressable>
            </View>
            <View>
              <Text style={styles.signUpInformation}>
                계정이 없나요?
                <Text style={styles.signUpText} onPress={signUpButton}>
                  회원가입
                </Text>
              </Text>
            </View>
            <View style={styles.snsLineBox}>
              <View style={styles.snsLine} />
              <View>
                <Text style={styles.snsText}>SNS</Text>
              </View>
              <View style={styles.snsLine} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333330',
    height: '100%',
  },
  signInBox: {
    alignItems: 'center',
    backgroundColor: '#333333',
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
  },
  signInText: {
    paddingVertical: 24,
    fontSize: 27,
    fontFamily: FONT,
    fontWeight: '400',
    letterSpacing: 0.5,
    color: '#EEEEEE',
  },
  internalComponentBatch: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    gap: 6,
    width: 200,
    height: 150,
  },
  idTextViewBox: {width: '100%'},
  idTextInputBox: {
    borderWidth: 1,
    width: '100%',
    height: 40,
    paddingLeft: 3,
    fontFamily: FONT,
    color: '#EEEEEE',
    letterSpacing: 0.2,
    borderRadius: 5,
    borderColor: '#999999',
  },
  passwordTextViewBox: {width: '100%'},
  passwordTextInputBox: {
    borderWidth: 1,
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: '#999999',
    paddingLeft: 3,
    color: '#EEEEEE',
    letterSpacing: 0.2,
    // fontFamily: signIn.password
    //   ? Platform.OS === 'ios'
    //     ? undefined
    //     : 'inherit'
    //   : FONT,
  },
  signInClickButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signUpInformation: {
    fontSize: 12,
    fontFamily: FONT,
    color: '#EEEEEE',
    letterSpacing: 0.2,
  },
  signUpText: {color: '#ACFADF', fontFamily: FONT},
  snsLineBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  snsLine: {flex: 1, height: 1, backgroundColor: '#EEEEEE'},
  snsText: {
    width: 50,
    textAlign: 'center',
    fontFamily: FONT,
    color: '#EEEEEE',
    letterSpacing: 0.2,
  },
});

export default SignIn;
