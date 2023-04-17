import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import {View} from 'react-native';
import useBlock from '../hooks/useBlock';
import {IAreaCell, TAreaContext} from '../types';

const GestureHandler = ({
  onSetFlag,
  onPressBlock,
  ...props
}: IAreaCell & TAreaContext) => {
  const {x, y, width, height} = useBlock(props);
  const tap = Gesture.Tap().onTouchesUp(() => {
    runOnJS(onPressBlock)(props);
  });
  const longTap = Gesture.LongPress().onEnd(() => {
    runOnJS(onSetFlag)(props);
  })
  return (
    <GestureDetector gesture={Gesture.Simultaneous(tap, longTap)}>
      <View
        style={{
          position: 'absolute',
          height,
          width,
          transform: [
            {translateX: x * width + 16},
            {translateY: y * height + 16 + 34},
          ]
        }}
      />
    </GestureDetector>
  );
};

export default GestureHandler;
