import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "../../App";
import React from "react";
import { View } from "react-native";

type TodoListProps = BottomTabScreenProps<RootBottomTabParamList, 'TodoList'>

const TodoList: React.FC<TodoListProps> = () => {
  return (
    <View>
      
      </View>
  )
}
