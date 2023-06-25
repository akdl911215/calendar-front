import {palette} from 'hooks/useColors';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {TodoType} from 'screens/todo.list';

interface Props {
  selected: TodoType;
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
}

const {width} = Dimensions.get('window');

const TodoViewModal: React.FC<Props> = ({
  selected,
  isModalVisible,
  setIsModalVisible,
}) => {
  const [title, setTitle] = useState(selected?.todo);

  useEffect(() => {
    setTitle(selected?.todo);
  }, [isModalVisible]);

  if (selected)
    return (
      <Modal visible={isModalVisible} animationType="slide">
        <View style={{marginTop: width / 20, padding: width / 20}}>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            value={title}
            style={{
              borderBottomWidth: 1,
              paddingVertical: width / 40,
              borderBottomColor: palette['gray-1'],
            }}
            onChange={e => setTitle(e.nativeEvent.text)}
          />
        </View>
      </Modal>
    );
  return null;
};

export default TodoViewModal;
