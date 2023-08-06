import {useState} from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

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
        color: 'rgb(200, 200, 200)',
        textDecorationStyle: 'solid',
        textDecorationLine: 'line-through',
      } as const;
    return null;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (!isChecked) {
          setSelectedTodo(todo);
          setIsModalVisible(true);
        }
      }}>
      <TouchableOpacity onPress={e => e.stopPropagation()}>
        <CheckBox
          value={isChecked}
          style={styles.checkbox}
          onValueChange={setIsChecked}
          onTouchEnd={e => e.stopPropagation()}
        />
      </TouchableOpacity>
      <Text style={updateTextStyleByIsChecked()}>{todo.todo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: GAP,
    padding: GAP,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
  },
  checkbox: {},
});

export default ToDo;
