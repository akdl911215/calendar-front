import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useKeyboard} from 'hooks/useKeyboard';

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
  const {isKeyboardVisible, keyboardHeight} = useKeyboard();
  const bottomByKeyboardHeight = {
    bottom: isKeyboardVisible && Platform.OS === 'ios' ? keyboardHeight : 0,
  };

  return (
    <KeyboardAvoidingView>
      <Modal visible={isModalVisible} transparent>
        <TouchableOpacity
          onPress={() => setIsModalVisible(false)}
          style={[
            styles.to_do_create_modal_background,
            {backgroundColor: isModalVisible ? 'black' : 'none', opacity: 0.3},
          ]}
        />
        <View
          style={[styles.to_do_create_modal_container, bottomByKeyboardHeight]}>
          <TextInput style={styles.title_input} />
          <TouchableOpacity
            onPress={() => setIsModalVisible(!isModalVisible)}
            style={styles.create_button}>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  to_do_create_modal_background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  to_do_create_modal_container: {
    padding: width / 20,
    height: width / 3.5,
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  title_input: {
    backgroundColor: '#EEEEEE',
    width: '100%',
    fontSize: width / 15,
    borderRadius: 5,
    padding: width / 40,
  },
  create_button: {
    backgroundColor: '#639CD9',
    borderRadius: 100,
    width: width / 10,
    height: width / 10,
    position: 'absolute',
    right: width / 15,
    bottom: width / 15,
  },
  triangle: {
    borderBottomColor: 'white',
    borderBottomWidth: width / 10,
    borderLeftWidth: width / 20,
    borderRightWidth: width / 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
    transform: [{scale: 0.4}, {rotate: '90deg'}, {translateY: -(width / 80)}],
  },
});

export default CalendarModal;
