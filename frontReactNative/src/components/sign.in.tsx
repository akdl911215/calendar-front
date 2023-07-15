import {
  Button,
  Dimensions,
  Linking,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 2.2;
const VIEW_WIDTH = width / 1.3;

const SignIn = () => {
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
                }}
                placeholder=" 아이디를 입력하세요."
              />
            </View>
            <View style={{width: '100%'}}>
              <TextInput
                style={{
                  borderWidth: 1,
                  width: '100%',
                  height: 40,
                  borderRadius: 4,
                }}
                placeholder=" 비밀번호를 입력하세요."
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
                ]}>
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
