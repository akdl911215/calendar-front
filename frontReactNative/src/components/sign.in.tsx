import {Alert, Button, Dimensions, Text, TextInput, View} from 'react-native';

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 1.6;
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
        }}>
        <View
          style={{
            top: '10%',
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
              fontSize: 35,
              fontStyle: 'normal',
              fontWeight: '400',
              letterSpacing: 0.2,
              color: '#29a19c',
            }}>
            Login
          </Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            gap: 20,

            width: 200,
            height: 150,
            // alignSelf: 'stretch',
          }}>
          <View style={{}}>
            <TextInput>ID</TextInput>
          </View>
          <View>
            <TextInput>PASSWORD</TextInput>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Button
              title="로그인"
              onPress={() => Alert.alert('Login Button pressed')}
            />
            <Button
              title="돌아가기"
              color="#f194ff"
              onPress={() => Alert.alert('Return Button pressed')}></Button>
          </View>
        </View>
      </View>
    </>
  );
};

export default SignIn;
