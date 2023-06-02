import React, {PropsWithChildren, type ReactNode} from 'react';
import {View, ScrollView, Text} from 'react-native';

const dummy = [{name: 'park', age: 30, location: 'Seoul'}];

type Props<T> = {
  list: T;
};

export const ChildComponent: React.FC<any> = props => {
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  );
};

export const ReusableList = <T extends readonly any[]>({
  list,
  children,
}: PropsWithChildren<Props<T>>) => {
  return (
    <ScrollView>
      {list.map(item => (
        <>
          {React.Children.map<ReactNode, ReactNode>(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as JSX.Element, {item});
            }
          })}
        </>
      ))}
    </ScrollView>
  );
};

export const App = () => {
  return (
    <View>
      <ReusableList list={dummy}>
        <ChildComponent />
      </ReusableList>
    </View>
  );
};
