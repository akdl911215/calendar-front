import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSetRecoilState} from 'recoil';
import {userModelState} from '../atoms/users.atoms';
import {Fonts} from '../../assets/fonts/fonts';
import {useEffect, useState} from 'react';
import {InquiryDataAPI, UpdateDataAPI} from '../api/user.api';
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
  const [disable, setDisable] = useState<boolean>(false);

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

  const updateButton = async () => {
    if (
      user.id === '' ||
      user.appId === '' ||
      user.nickname === '' ||
      user.phone === ''
    ) {
      Alert.alert('수정할 정보를 확인해 주세요.');
      return;
    }

    const {data} = await UpdateDataAPI({
      id: user.id,
      appId: user.appId,
      phone: user.phone,
      nickname: user.nickname,
    });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.textBox}>ID</Text>
            <TextInput
              style={styles.textInputBox}
              placeholder="ID"
              placeholderTextColor="#999999"
              value={user.appId}
            />
          </View>
          <View style={styles.box}>
            <Text style={styles.textBox}>닉네임</Text>
            <TextInput
              style={styles.textInputBox}
              placeholder="Nickname"
              placeholderTextColor="#999999"
              value={user.nickname}
            />
          </View>
          <View style={styles.box}>
            <Text style={styles.textBox}>핸드폰</Text>
            <TextInput
              style={styles.textInputBox}
              placeholder="Phone"
              placeholderTextColor="#999999"
              value={user.phone}
            />
          </View>
          <View style={styles.box}>
            <Text style={styles.textBox}>E-mail</Text>
            <TextInput
              style={styles.textInputBox}
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
            ]}
            onPress={updateButton}>
            {({pressed}) => (
              <Text style={{fontFamily: FONT, color: '#EEEEEE'}}>
                {pressed ? '전송 중...' : '수정 전송'}
              </Text>
            )}
          </Pressable>

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
});

export default Profile;
