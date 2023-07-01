import {useState} from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

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
  const [isChecked, setIsChecked] = useState(false);

  const updateTextStyleByIsChecked = () => {
    if (isChecked)
      return {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: 'rgb(200, 200, 200)',
      } as const;
    return null;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setSelectedTodo(todo);
        setIsModalVisible(true);
      }}>
      <TouchableOpacity onPress={e => e.stopPropagation()}>
        <CheckBox
          value={isChecked}
          style={styles.checkbox}
          onValueChange={setIsChecked}
          onTouchEnd={e => {
            e.stopPropagation();
          }}
        />
      </TouchableOpacity>
      <Text style={updateTextStyleByIsChecked()}>{todo.todo}</Text>
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
