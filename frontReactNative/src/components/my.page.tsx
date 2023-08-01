import {Dimensions, Text, View} from 'react-native';
import {Fonts} from '../../assets/fonts/fonts';
import {useState} from 'react';
import Profile from './profile';
import CustomersVoice from './customers.voice';

const {height, width} = Dimensions.get('window');
const VIEW_HEIGHT: number = height / 1.5;
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
            backgroundColor: '#ffffff',
            height: height / 17,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View>
            <View
              style={{
                backgroundColor: menubar ? '#FF99CC' : '#ffffff',
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
                  color: '#29a19c',
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
                  backgroundColor: menubar ? '#ffffff' : '#FF99CC',
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
                    color: '#29a19c',
                    fontFamily: FONT,
                  }}>
                  고객의 소리함
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{paddingVertical: 10}}></View>

        <View style={{backgroundColor: '#ffffff', height: VIEW_HEIGHT}}>
          {menubar ? <Profile /> : <CustomersVoice />}
        </View>
      </View>
    </>
  );
};

export default MyPage;
