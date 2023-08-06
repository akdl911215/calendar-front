import {Dimensions, Text, View} from 'react-native';
import {Fonts} from '../../assets/fonts/fonts';
import {useState} from 'react';
import Profile from './profile';
import CustomersVoice from './customers.voice';

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 1.39;
const VIEW_WIDTH = width / 1.3;
const FONT: string = Fonts.BMDOHYEON;

const MyPage = () => {
  const [menubar, setMenubar] = useState<boolean>(true);
  const menuBarButton = (): void => setMenubar(!menubar);

  return (
    <>
      <View
        style={{
          display: 'flex',
          backgroundColor: '#cccccc',
          height: '100%',
        }}>
        <View
          style={{
            backgroundColor: '#272829',
            height: height / 17,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View>
            <View
              style={{
                width: 140,
                height: '100%',
                alignItems: 'center',
                borderRadius: 4,
              }}>
              <Text
                onPress={menuBarButton}
                style={{
                  paddingTop: 8,
                  fontSize: 20,
                  letterSpacing: 0.4,
                  color: menubar ? '#F5F5F5' : '#9E9FA5',
                  fontFamily: FONT,
                }}>
                Profile
              </Text>
            </View>
          </View>
          <View>
            <View>
              <View
                style={{
                  width: 140,
                  height: '100%',
                  alignItems: 'center',
                  borderRadius: 4,
                }}>
                <Text
                  onPress={menuBarButton}
                  style={{
                    paddingTop: 8,
                    fontSize: 20,
                    letterSpacing: 0.4,
                    color: menubar ? '#9E9FA5' : '#F5F5F5',
                    fontFamily: FONT,
                  }}>
                  고객의 소리함
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{paddingVertical: 7}}></View>

        <View style={{backgroundColor: '#272829', height: VIEW_HEIGHT}}>
          {menubar ? <Profile /> : <CustomersVoice />}
        </View>
      </View>
    </>
  );
};

export default MyPage;
