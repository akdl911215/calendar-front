import {PropsWithChildren} from 'react';
import {ScrollView, View} from 'react-native';

interface Props {
  padding?: number;
}

const CustomizedScrollView: React.FC<PropsWithChildren<Props>> = ({
  padding = 20,
  children,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}>
      <View style={{padding}}>{children}</View>
    </ScrollView>
  );
};

export default CustomizedScrollView;
