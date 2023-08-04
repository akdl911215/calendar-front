import {Dimensions, Text, View} from 'react-native';
import React from 'react';
import {Fonts} from '../../assets/fonts/fonts';

const FONT: string = Fonts.BMDOHYEON;
// const {height, width} = Dimensions.get('window');
// const VIEW_HEIGHT: number = height / 1.5;
// const VIEW_WIDTH = width / 1.3;

const CustomersVoice = () => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: FONT,
            alignSelf: 'center',
            fontSize: 20,
            color: '#F5F5F5',
          }}>
          고객의 소리함 준비중이에요!
        </Text>
        <Text
          style={{
            fontFamily: FONT,
            alignSelf: 'center',
            fontSize: 20,
            color: '#F5F5F5',
          }}>
          곧 만나요!
        </Text>
      </View>
    </>
  );
};

export default CustomersVoice;
