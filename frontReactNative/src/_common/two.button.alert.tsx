import {Alert, Button, StyleSheet, View} from 'react-native';

const TwoButtonAlert = (param: {readonly title: string}) => {
  const createTwoButtonAlert = () =>
    Alert.alert(`${param.title} 변경`, `${param.title} 변경하시겠습니까?`, [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: '확인', onPress: () => console.log('Ok Pressed')},
    ]);

  return (
    <View style={styles.container}>
      <Button title={'2-Button Alert'} onPress={createTwoButtonAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default TwoButtonAlert;
