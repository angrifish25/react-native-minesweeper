import {TComplexity} from './types';

export const COMPLEXITY: {[key: string]: TComplexity} = {
  easy: {
    width: 10,
    height: 10,
    bomb: 20,
  },
};
export enum Complexity {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  CUStOM = 'custom',
}
export enum GameState {
  RESET = -1,
  ACTIVE = 0,
  WIN = 1,
  LOOSE = 2,
}
