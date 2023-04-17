import {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import type {IAreaCell} from '../types';
import {COMPLEXITY} from '../constants';
import {useGameContext} from '../contexts/GameContext';
import {useAreaContext} from '../contexts/AreaContext';

const useBlock = (props: IAreaCell) => {
  const {isBomb, innerValue, x, y, isOpen, isFlag} = props;
  const {complexity} = useGameContext();
  const {onPressBlock, onSetFlag} = useAreaContext();
  const {width} = useWindowDimensions();
  const targetComplexity = COMPLEXITY[complexity];
  const widthB = useMemo(() => (width - 30) / targetComplexity.width, [width]);
  const heightB = useMemo(() => (width - 30) / targetComplexity.width, [width]);
  const backgroundColor = useMemo<string>(() => {
    if (isFlag) {
      return '#F4A460';
    }
    if (isOpen) {
      return '#FAFAFA';
    }
    return '#D8D8D8';
  }, [isFlag, isOpen]);
  const value = useMemo<string>(() => {
    if (isOpen) {
      if (isBomb) {
        return '💣';
      }
      if (innerValue) {
        return String(innerValue);
      }
    }
    if (isFlag) {
      return '🚩';
    }
    return '';
  }, [isBomb, innerValue, isFlag, isOpen]);

  return {
    width: widthB,
    height: heightB,
    backgroundColor,
    value,
    x,
    y,
    id: props.id,
    onSetFlag: () => onSetFlag(props),
    onPressBlock: () => onPressBlock(props),
  };
};

export default useBlock;
