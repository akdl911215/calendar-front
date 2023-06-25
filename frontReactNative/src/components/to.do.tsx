import {useState} from 'react';
import {Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {type TodoType} from 'screens/todo.list';

interface Props {
  todo: TodoType;
  setSelectedTodo: (value: TodoType) => void;
  setIsModalVisible: (value: boolean) => void;
}

const {width} = Dimensions.get('window');
const GAP = width / 30;

const ToDo: React.FC<Props> = ({todo, setSelectedTodo, setIsModalVisible}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setSelectedTodo(todo);
        setIsModalVisible(true);
      }}>
      <CheckBox
        value={isSelected}
        onValueChange={setIsSelected}
        style={styles.checkbox}
      />
      <Text>{todo.todo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    gap: GAP,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    padding: GAP,
  },
  checkbox: {},
});

export default ToDo;
