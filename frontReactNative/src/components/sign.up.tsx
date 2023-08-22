import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Fonts} from '../../assets/fonts/fonts';

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 1.5;
const VIEW_WIDTH = width / 1.3;
const FONT: string = Fonts.BMDOHYEON;

const Signup = () => {
  const handleChange = (event: {name: string; value: string}): void => {
    const {name, value} = event;
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
                onChangeText={value => handleChange({name: 'appId', value})}
              />
              <Pressable
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
                    {pressed ? '중복확인 중...' : '중복확인'}
                  </Text>
                )}
              </Pressable>
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
            <View style={styles.idTextViewBox}>
              <TextInput
                style={styles.idTextInputBox}
                placeholder="닉네임을 입력하세요."
                placeholderTextColor="#999999"
                onChangeText={value => handleChange({name: 'nickname', value})}
              />
            </View>
            <View style={styles.idTextViewBox}>
              <TextInput
                style={styles.idTextInputBox}
                placeholder="핸드폰을 입력하세요."
                placeholderTextColor="#999999"
                onChangeText={value => handleChange({name: 'phone', value})}
              />
            </View>
            <View style={styles.idTextViewBox}>
              <TextInput
                style={styles.idTextInputBox}
                placeholder="E-메일을 입력하세요."
                placeholderTextColor="#999999"
                onChangeText={value => handleChange({name: 'email', value})}
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

export default Signup;
