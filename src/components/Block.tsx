import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import useBlock from '../hooks/useBlock';
import type {IAreaCell} from '../types';

const Block = (props: IAreaCell) => {
  const {width, height, backgroundColor, value, id, onSetFlag, onPressBlock} =
    useBlock(props);

  return (
    <TouchableOpacity
      key={id}
      style={[styles.block, {backgroundColor, width, height}]}
      onLongPress={onSetFlag}
      onPress={onPressBlock}>
      <Text>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  block: {
    borderColor: '#979797',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Block;
