import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Fonts} from '../../assets/fonts/fonts';
import {useEffect, useState} from 'react';
import {
  DuplicateVerificationAppId,
  DuplicateVerificationEmail,
  DuplicateVerificationNickname,
  DuplicateVerificationPhone,
  SignUpDataAPI,
} from '../api/user.api';
import {userSignUpModelState} from '../atoms/users.atoms';
import {useSetRecoilState} from 'recoil';

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 1.5;
const VIEW_WIDTH = width / 1.3;
const FONT: string = Fonts.BMDOHYEON;

interface SignUpType {
  readonly appId: string;
  readonly password: string;
  readonly nickname: string;
  readonly phone: string;
  readonly email: string;
}

type DuplicateVerification = 'exists' | 'nonExists' | 'initialValue';
interface UserDuplicateVerificationType {
  readonly appId: DuplicateVerification;
  readonly nickname: DuplicateVerification;
  readonly phone: DuplicateVerification;
  readonly email: DuplicateVerification;
}

interface DuplicateVerificationButtonType {
  readonly appId: boolean;
  readonly nickname: boolean;
  readonly phone: boolean;
  readonly email: boolean;
}

const Signup = () => {
  const setSignInModel = useSetRecoilState(userSignUpModelState);

  const [signUp, setSignUp] = useState<SignUpType>({
    appId: '',
    password: '',
    nickname: '',
    phone: '',
    email: '',
  });
  const {appId, password, phone, email, nickname} = signUp;

  const [userDuplicateVerification, setUserDuplicateVerification] =
    useState<UserDuplicateVerificationType>({
      appId: 'initialValue',
      nickname: 'initialValue',
      phone: 'initialValue',
      email: 'initialValue',
    });

  const handleChange = async (event: {
    readonly name: string;
    readonly value: string;
  }): Promise<void> => {
    const {name, value} = event;

    setSignUp({
      ...signUp,
      [name]: value.toLowerCase(),
    });
  };

  const [duplicateVerificationButton, setDuplicateVerificationButton] =
    useState<DuplicateVerificationButtonType>({
      appId: false,
      nickname: false,
      phone: false,
      email: false,
    });

  useEffect(
    () => console.log(userDuplicateVerification),
    [userDuplicateVerification],
  );
  useEffect(
    () => console.log(duplicateVerificationButton),
    [duplicateVerificationButton],
  );

  const duplicateVerification = async (event: {
    readonly name: string;
  }): Promise<void> => {
    const {name} = event;
    console.log('name : ', name);

    if (name === 'appId') {
      if (!appId) {
        Alert.alert('아이디를 확인하세요.');
        return;
      }
      // else if (!nickname) {
      //   Alert.alert('닉네임을 확인하세요.');
      //   return;
      // } else if (!phone) {
      //   Alert.alert('핸드폰 번호를 확인하세요.');
      //   return;
      // } else if (!email) {
      //   Alert.alert('이메일을 확인하세요.');
      //   return;
      // }

      const {
        data: {
          response: {appIdExists},
        },
      } = await DuplicateVerificationAppId(appId);

      console.log('appIdExists : ', appIdExists);
      if (appIdExists === false) {
        Alert.alert('존재하는 아이디입니다.');
        return;
      }

      setUserDuplicateVerification({
        ...userDuplicateVerification,
        appId: appIdExists,
      });
      setDuplicateVerificationButton({
        ...duplicateVerificationButton,
        appId: true,
      });
    }

    if (name === 'phone') {
      const {
        data: {
          response: {phoneExists},
        },
      } = await DuplicateVerificationPhone(phone);

      console.log('phoneExists : ', phoneExists);
      if (phoneExists === false) {
        Alert.alert('존재하는 번호입니다.');
        return;
      }

      setUserDuplicateVerification({
        ...userDuplicateVerification,
        phone: phoneExists,
      });
      setDuplicateVerificationButton({
        ...duplicateVerificationButton,
        phone: true,
      });
    }

    if (name === 'email') {
      const {
        data: {
          response: {emailExists},
        },
      } = await DuplicateVerificationEmail(email);

      console.log('emailExists : ', emailExists);
      if (emailExists === false) {
        Alert.alert('존재하는 이메일입니다.');
        return;
      }

      setUserDuplicateVerification({
        ...userDuplicateVerification,
        email: emailExists,
      });
      setDuplicateVerificationButton({
        ...duplicateVerificationButton,
        email: true,
      });
    }

    if (name === 'nickname') {
      const {
        data: {
          response: {nicknameExists},
        },
      } = await DuplicateVerificationNickname(nickname);

      console.log('nicknameExists : ', nicknameExists);
      if (nicknameExists === false) {
        Alert.alert('존재하는 닉네임입니다.');
        return;
      }

      setUserDuplicateVerification({
        ...userDuplicateVerification,
        nickname: nicknameExists,
      });
      setDuplicateVerificationButton({
        ...duplicateVerificationButton,
        nickname: true,
      });
    }
  };

  const duplicateButtonUncheck = async (event: {
    readonly name: string;
  }): Promise<void> => {
    const {name} = event;

    if (name === 'appId') {
      setDuplicateVerificationButton({
        ...duplicateVerificationButton,
        appId: false,
      });
      setUserDuplicateVerification({
        ...userDuplicateVerification,
        appId: 'initialValue',
      });
    }

    if (name === 'email') {
      setDuplicateVerificationButton({
        ...duplicateVerificationButton,
        email: false,
      });
      setUserDuplicateVerification({
        ...userDuplicateVerification,
        email: 'initialValue',
      });
    }

    if (name === 'nickname') {
      setDuplicateVerificationButton({
        ...duplicateVerificationButton,
        nickname: false,
      });
      setUserDuplicateVerification({
        ...userDuplicateVerification,
        nickname: 'initialValue',
      });
    }

    if (name === 'phone') {
      setDuplicateVerificationButton({
        ...duplicateVerificationButton,
        phone: false,
      });
      setUserDuplicateVerification({
        ...userDuplicateVerification,
        phone: 'initialValue',
      });
    }
  };

  const createUserSubmit = async () => {
    console.log('create');
    if (!appId || !password || !nickname || !email || !phone) {
      Alert.alert('회원가입 정보를 확인해보세요.');
      return;
    }

    const {
      data: {response},
    } = await SignUpDataAPI(signUp);

    console.log('response : ', response);
    if (!!response) await setSignInModel(false);
    else Alert.alert('회원가입 시도를 다시 해보세요.');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.signInBox}>
          <Text style={styles.signInText}>회원가입</Text>
          <View style={styles.internalComponentBatch}>
            <View style={styles.idTextViewBox}>
              <TextInput
                style={styles.idTextInputBox}
                placeholder="아이디를 입력하세요."
                placeholderTextColor="#999999"
                editable={
                  userDuplicateVerification.appId === 'exists' ||
                  userDuplicateVerification.appId === 'initialValue'
                }
                onChangeText={value => handleChange({name: 'appId', value})}
              />
              {duplicateVerificationButton.appId ? (
                <Pressable
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? '#999999' : '#CCCCCC',
                    },
                    {
                      borderRadius: 8,
                      padding: 6,
                      flex: 1,
                    },
                  ]}
                  onPress={() => duplicateButtonUncheck({name: 'appId'})}>
                  {({pressed}) => (
                    <Text
                      style={{
                        fontFamily: FONT,
                        fontSize: 15,
                      }}>
                      {pressed ? '해제 중...' : '확인 해제'}
                    </Text>
                  )}
                </Pressable>
              ) : (
                <Pressable
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? '#999999' : '#CCCCCC',
                    },
                    {
                      borderRadius: 8,
                      padding: 6,
                      flex: 1,
                    },
                  ]}
                  onPress={() => duplicateVerification({name: 'appId'})}>
                  {({pressed}) => (
                    <Text
                      style={{
                        fontFamily: FONT,
                        fontSize: 15,
                      }}>
                      {pressed ? '확인 중...' : '중복확인'}
                    </Text>
                  )}
                </Pressable>
              )}
            </View>
            <View style={styles.passwordTextViewBox}>
              <TextInput
                style={styles.passwordTextInputBox}
                textContentType="password"
                placeholder="비밀번호를 입력하세요."
                placeholderTextColor="#999999"
                onChangeText={value => handleChange({name: 'password', value})}
              />
            </View>
            <View style={styles.idTextViewBox}>
              <TextInput
                style={styles.idTextInputBox}
                placeholder="닉네임을 입력하세요."
                placeholderTextColor="#999999"
                editable={
                  userDuplicateVerification.nickname === 'nonExists' ||
                  userDuplicateVerification.nickname === 'initialValue'
                }
                onChangeText={value => handleChange({name: 'nickname', value})}
              />
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#999999' : '#CCCCCC',
                  },
                  {
                    borderRadius: 8,
                    padding: 6,
                    flex: 1,
                  },
                ]}
                onPress={() => duplicateVerification({name: 'nickname'})}>
                {({pressed}) => (
                  <Text
                    style={{
                      fontFamily: FONT,
                      fontSize: 15,
                    }}>
                    {pressed ? '확인 중...' : '중복확인'}
                  </Text>
                )}
              </Pressable>
            </View>
            <View style={styles.idTextViewBox}>
              <TextInput
                style={styles.idTextInputBox}
                placeholder="핸드폰을 입력하세요."
                placeholderTextColor="#999999"
                editable={
                  userDuplicateVerification.phone === 'nonExists' ||
                  userDuplicateVerification.phone === 'initialValue'
                }
                onChangeText={value => handleChange({name: 'phone', value})}
              />
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#999999' : '#CCCCCC',
                  },
                  {
                    borderRadius: 8,
                    padding: 6,
                    flex: 1,
                  },
                ]}
                onPress={() => duplicateVerification({name: 'phone'})}>
                {({pressed}) => (
                  <Text
                    style={{
                      fontFamily: FONT,
                      fontSize: 15,
                    }}>
                    {pressed ? '확인 중...' : '중복확인'}
                  </Text>
                )}
              </Pressable>
            </View>
            <View style={styles.idTextViewBox}>
              <TextInput
                style={styles.idTextInputBox}
                placeholder="E-메일을 입력하세요."
                placeholderTextColor="#999999"
                editable={
                  userDuplicateVerification.email === 'nonExists' ||
                  userDuplicateVerification.email === 'initialValue'
                }
                onChangeText={value => handleChange({name: 'email', value})}
              />
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#999999' : '#CCCCCC',
                  },
                  {
                    borderRadius: 8,
                    padding: 6,
                    flex: 1,
                  },
                ]}
                onPress={() => duplicateVerification({name: 'email'})}>
                {({pressed}) => (
                  <Text
                    style={{
                      fontFamily: FONT,
                      fontSize: 15,
                    }}>
                    {pressed ? '확인 중...' : '중복확인'}
                  </Text>
                )}
              </Pressable>
            </View>
            <View style={styles.signInClickButton}>
              <Pressable
                onPress={createUserSubmit}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#999999' : '#CCCCCC',
                  },
                  {
                    borderRadius: 8,
                    padding: 6,
                  },
                ]}>
                {({pressed}) => (
                  <Text style={{fontFamily: FONT}}>
                    {pressed ? '회원가입 중...' : '제출'}
                  </Text>
                )}
              </Pressable>
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
    paddingVertical: 75,
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
  idTextViewBox: {width: '100%', display: 'flex', flexDirection: 'row'},
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
    flex: 5,
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

export default Signup;
