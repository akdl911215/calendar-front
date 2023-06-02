import {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {type TodoType} from 'screens/todo.list';
// import {palette} from 'hooks/useColors';

interface Props extends TodoType {}

const {width} = Dimensions.get('window');
const GAP = width / 30;

const ToDo: React.FC<Props> = ({id, date, todo, done}) => {
  console.log(id, date, done);
  const [isSelected, setIsSelected] = useState(false);
  return (
    <TouchableOpacity style={styles.container}>
      <CheckBox
        value={isSelected}
        onValueChange={setIsSelected}
        style={styles.checkbox}
      />
      <Text>{todo}</Text>
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
