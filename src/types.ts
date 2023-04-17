import {Complexity} from './constants';

export interface IAreaCell {
  isBomb: boolean;
  innerValue: number | null;
  id: string;
  isOpen: boolean;
  isFlag: boolean;
  x: number;
  y: number;
  open: () => void;
  toggleFlag: () => void;
}

export type TAreaContext = {
  onPressBlock: (value: IAreaCell) => void;
  onSetFlag: (value: IAreaCell) => void;
};

export type TArea = {
  [key: string]: IAreaCell;
};

export type complexity_type = 'easy' | 'medium' | 'hard' | 'random';
export type TComplexity = {
  width: number;
  height: number;
  bomb: number;
};
export type TGameContext = {
  finish: number;
  complexity: Complexity;
  setFinish: (value: number) => void;
};
