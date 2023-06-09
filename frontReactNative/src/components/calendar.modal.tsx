import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions, Modal, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
}

const {width} = Dimensions.get('window');

const CalendarModal: React.FC<Props> = ({
  isModalVisible,
  setIsModalVisible,
  selected,
}) => {
  return (
    <Modal visible={isModalVisible} animationType="slide">
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={{alignItems: 'flex-end', padding: width / 20}}>
            <TouchableOpacity
              onPress={() => setIsModalVisible(!isModalVisible)}>
              <Text style={{fontWeight: 'bold'}}>Close</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>{selected}</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default CalendarModal;
