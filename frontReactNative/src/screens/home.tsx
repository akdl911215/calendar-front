import {View, Text} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {type RootBottomTabParamList} from '../../App';

type HomeProps = BottomTabScreenProps<RootBottomTabParamList, 'Home'>;

const Home: React.FC<HomeProps> = () => {
  return (
    <View>
      <Text>Home here!</Text>
    </View>
  );
};

export default Home;
