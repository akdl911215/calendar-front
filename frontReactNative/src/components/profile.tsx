import {Dimensions, Pressable, Text, TextInput, View} from 'react-native';

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 2;
const VIEW_WIDTH = width / 1.3;

const Profile = () => {
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
              paddingTop: 10,
              paddingBottom: 65,
              fontSize: 27,
              fontStyle: 'normal',
              fontWeight: '400',
              letterSpacing: 0.2,
              color: '#29a19c',
            }}>
            Profile
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
              gap: 10,
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
                placeholder="아이디"
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
                placeholder="닉네임"
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
                placeholder="핸드폰"
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
                  <Text>
                    {pressed ? '회원 정보 수정 중...' : '회원 정보 수정'}
                  </Text>
                )}
              </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              <View>
                <Text style={{textAlign: 'center'}}></Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View>
            <View style={{borderWidth: 1, borderRadius: 4}}>
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
                  <Text>
                    {pressed
                      ? '고객의 목소리함으로 이동중...'
                      : '고객의 목소리를 들려주세요'}
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

export default Profile;
