import React from 'react';
import {GameContextProvider} from '../contexts/GameContext';
import Area from './Area';
import ControllPanel from './ControllPanel';

const Game = () => (
  <GameContextProvider>
    <Area />
    <ControllPanel />
  </GameContextProvider>
);

export default Game;
