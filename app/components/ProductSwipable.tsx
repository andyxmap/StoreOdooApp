// @ts-ignore
import Swipeable from 'react-native-swipeable';
import {Text} from 'native-base'
import React from 'react'
import { TouchableHighlight } from 'react-native';

const leftContent = <Text>Pull to activate</Text>;

const rightButtons = [
  <TouchableHighlight key={1}><Text>Button 1</Text></TouchableHighlight>,
  <TouchableHighlight key={2}><Text>Button 2</Text></TouchableHighlight>
];

export function Swipable(props:any) {
  return (
    <Swipeable  leftContent={leftContent} rightButtons={rightButtons}>
      {props.children}
    </Swipeable>
  );
}