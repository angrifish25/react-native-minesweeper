import React, {createContext, useContext} from 'react';
import useGame from '../hooks/useGame';
import type {TGameContext} from '../types';

const GameContext = createContext<TGameContext>();

export const GameContextProvider = ({children}) => {
  const gameProviderValue = useGame();
  return (
    <GameContext.Provider value={gameProviderValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
