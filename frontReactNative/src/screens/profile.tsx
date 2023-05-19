import {View, Text} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {type RootBottomTabParamList} from '../../App';

type ProfileProps = BottomTabScreenProps<RootBottomTabParamList, '내정보'>;

const Profile: React.FC<ProfileProps> = () => {
  return (
    <View>
      <Text>Profile here!</Text>
    </View>
  );
};

export default Profile;
