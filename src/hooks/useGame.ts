import {useState} from 'react';
import {Complexity, GameState} from '../constants';

const useGame = () => {
  const [finish, setFinish] = useState(GameState.RESET);
  const [complexity, setComplexity] = useState(Complexity.EASY);

  return {finish, complexity, setFinish};
};

export default useGame;
