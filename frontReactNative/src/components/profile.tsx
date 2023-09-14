import {
  Alert,
  Button,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Fonts} from '../../assets/fonts/fonts';
import {useEffect, useState} from 'react';
import {
  InquiryDataAPI,
  UpdateEmailDataAPI,
  UpdateNicknameDataAPI,
  UpdatePhoneDataAPI,
} from '../api/user.api';
import {DATE} from '../_common/get.date';

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 2;
const VIEW_WIDTH = width / 1.3;
const FONT: string = Fonts.BMDOHYEON;

const Profile = () => {
  const [profileMenu, setProfileMenu] = useState<boolean>(true);
  const [customersVoiceMenu, setCustomersVoiceMenu] = useState<boolean>(false);
  const [user, setUser] = useState<UsersType>({
    id: '',
    app_id: '',
    nickname: '',
    password: '',
    phone: '',
    email: '',
    refresh_token: null,
    created_at: DATE,
    updated_at: DATE,
    deleted_at: null,
  });
  useEffect(() => console.log('user : ', user), []);
  const [disable, setDisable] = useState<boolean>(false);

  useEffect(() => {
    InquiryDataAPI()
      .then(res => {
        if (!res?.data?.response)
          Alert.alert('유저 정보를 가져오지 못했습니다.');

        setUser(res.data.response);
      })
      .catch(err => console.error(err));
  }, []);

  const updateNicknameButton = async () => {
    if (user.id === '' || user.nickname === '') {
      Alert.alert('수정할 정보를 확인해 주세요.');
      return;
    }

    await Alert.alert(`닉네임 변경`, `닉네임을 변경하시겠습니까?`, [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: async () => {
          await UpdateNicknameDataAPI({
            nickname: user.nickname,
          })
            .then(response => {
              setUser(response.data.response);
            })
            .catch(error => {
              // Error
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.data.response.statusCode === 409) {
                  Alert.alert('이미 존재하는 닉네임 입니다.');
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log('error.request : ', error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
            });
        },
      },
    ]);
  };

  const updatePhoneButton = async () => {
    if (user.id === '' || user.phone === '') {
      Alert.alert('수정할 정보를 확인해주세요.');
      return;
    }

    await Alert.alert(`핸드폰 번호 변경`, `핸드폰 번호 변경하시겠습니까?`, [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: async () => {
          await UpdatePhoneDataAPI({
            phone: user.phone,
          })
            .then(response => {
              setUser(response.data.response);
            })
            .catch(error => {
              // Error
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx

                console.log('error.response : ', error.response);
                if (error.response.data.response.statusCode === 409) {
                  Alert.alert('이미 존재하는 번호 입니다.');
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log('error.request : ', error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
            });
        },
      },
    ]);
  };

  const updateEmailButton = async () => {
    if (user.id === '' || user.email === '') {
      Alert.alert('수정할 정보를 확인해주세요.');
      return;
    }

    await Alert.alert(`이메일 변경`, `이메일 변경하시겠습니까?`, [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: async () => {
          await UpdateEmailDataAPI({
            email: user.email,
          })
            .then(response => {
              setUser(response.data.response);
            })
            .catch(error => {
              // Error
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.data.response.statusCode === 409) {
                  Alert.alert('이미 존재하는 이메일 입니다.');
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log('error.request : ', error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
            });
        },
      },
    ]);
  };

  const handleChange = (event: {name: string; value: string}): void => {
    const {name, value} = event;
    console.log(`name: ${name}, value: ${value}`);

    setUser({
      ...user,
      [name]: value.toLowerCase(),
    });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.textBox}>ID</Text>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <TextInput
                style={styles.textInputBox}
                placeholder="ID"
                placeholderTextColor="#999999"
                value={user.app_id}
                editable={false}
              />
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.textBox}>닉네임</Text>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <TextInput
                style={{
                  borderWidth: 2,
                  fontFamily: FONT,
                  width: '80%',
                  height: 40,
                  borderRadius: 5,
                  borderColor: '#999999',
                  paddingLeft: 8,
                  color: '#EEEEEE',
                  letterSpacing: 0.2,
                }}
                placeholder="Nickname"
                placeholderTextColor="#999999"
                value={user.nickname}
                onChangeText={value => handleChange({name: 'nickname', value})}
              />
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#999999' : '#CCCCCC',
                    borderRadius: 5,
                    padding: 6,
                    width: '20%',
                    height: '95%',
                  },
                ]}
                onPress={updateNicknameButton}>
                {({pressed}) => (
                  <Text
                    style={{
                      fontFamily: FONT,
                      color: '#EEEEEE',
                      textAlign: 'center',
                      fontSize: 20,
                    }}>
                    {pressed ? '전송' : '수정'}
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.textBox}>핸드폰</Text>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <TextInput
                style={{
                  borderWidth: 2,
                  fontFamily: FONT,
                  width: '80%',
                  height: 40,
                  borderRadius: 5,
                  borderColor: '#999999',
                  paddingLeft: 8,
                  color: '#EEEEEE',
                  letterSpacing: 0.2,
                }}
                placeholder="Phone"
                placeholderTextColor="#999999"
                value={user.phone}
                onChangeText={value => handleChange({name: 'phone', value})}
              />
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#999999' : '#CCCCCC',
                    borderRadius: 5,
                    padding: 6,
                    width: '20%',
                    height: '95%',
                  },
                ]}
                onPress={updatePhoneButton}>
                {({pressed}) => (
                  <Text
                    style={{
                      fontFamily: FONT,
                      color: '#EEEEEE',
                      textAlign: 'center',
                      fontSize: 20,
                    }}>
                    {pressed ? '전송' : '수정'}
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.textBox}>E-mail</Text>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <TextInput
                style={{
                  borderWidth: 2,
                  fontFamily: FONT,
                  width: '80%',
                  height: 40,
                  borderRadius: 5,
                  borderColor: '#999999',
                  paddingLeft: 8,
                  color: '#EEEEEE',
                  letterSpacing: 0.2,
                }}
                placeholder="E-mail"
                placeholderTextColor="#999999"
                value={user.email}
                onChangeText={value => handleChange({name: 'email', value})}
              />
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#999999' : '#CCCCCC',
                    borderRadius: 5,
                    padding: 6,
                    width: '20%',
                    height: '95%',
                  },
                ]}
                onPress={updateEmailButton}>
                {({pressed}) => (
                  <Text
                    style={{
                      fontFamily: FONT,
                      color: '#EEEEEE',
                      textAlign: 'center',
                      fontSize: 20,
                    }}>
                    {pressed ? '전송' : '수정'}
                  </Text>
                )}
              </Pressable>
            </View>
          </View>

          <View style={styles.horizonLine} />

          <View style={{marginTop: 5, width: '100%', alignItems: 'center'}}>
            <Text style={styles.textBox}>개선되면 좋은점을 이야기해요!</Text>
            <TextInput
              style={{
                ...styles.textInputBox,
                backgroundColor: disable ? '#FFFFFF' : '#333333',
              }}
              editable={disable}
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
            ]}
            onPress={() => Alert.alert('현재 준비중인 기능이에요!')}>
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

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: '10%',
    gap: 10,
  },
  box: {marginTop: 9, width: '100%', alignItems: 'center'},
  textBox: {
    width: '100%',
    textAlign: 'left',
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 1,
    fontFamily: FONT,
    color: '#EEEEEE',
    letterSpacing: 0.5,
  },
  textInputBox: {
    borderWidth: 2,
    fontFamily: FONT,
    width: '100%',
    height: 40,
    borderRadius: 10,
    borderColor: '#999999',
    paddingLeft: 8,
    color: '#EEEEEE',
    letterSpacing: 0.2,
  },
  horizonLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 10,
  },
  alertContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Profile;
