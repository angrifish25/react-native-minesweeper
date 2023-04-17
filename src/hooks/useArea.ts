import {useEffect, useState} from 'react';
import {Complexity, COMPLEXITY, GameState} from '../constants';
import {useGameContext} from '../contexts/GameContext';
import checkBomb from '../helpers/checkBomb';
import AreaCell from '../models/AreaCell';
import type {IAreaCell, TArea} from '../types';

const generateArea = (complexity: Complexity): [TArea, number] => {
  const targetComplexity = COMPLEXITY[complexity];
  const maxBombs = targetComplexity.bomb;
  const fileds = targetComplexity.height * targetComplexity.width;

  let areaArray: TArea = {};
  let bombsCount = 0;

  for (let i = 0; i < fileds; i++) {
    let isBomb = false;
    const y = Math.floor(i / 10);
    const x = i % targetComplexity.width;

    if (
      Math.random() * fileds < targetComplexity.width &&
      maxBombs - bombsCount > 0
    ) {
      isBomb = true;
      bombsCount++;
    }

    const key = `${y}_${x}`;
    areaArray[key] = new AreaCell({x, y, isBomb});
  }

  for (let i = 0; i < fileds; i++) {
    const y = Math.floor(i / 10),
      x = i % targetComplexity.width;
    const id = `${y}_${x}`;
    let num = 0;

    for (let k = 0; k < 9; k++) {
      num += checkBomb(
        y - (Math.floor(k / 3) - 1) + '_' + (x - ((k % 3) - 1)),
        areaArray,
      );
    }

    areaArray[id].innerValue = num;
  }
  return [areaArray, bombsCount];
};

const useMineArea = () => {
  const {complexity, finish, setFinish} = useGameContext();
  const [bombs, setBombs] = useState<number>(0);
  const [area, setArea] = useState<TArea>({});

  const onSetFlag = (oItem: IAreaCell) => {
    if (!oItem.isOpen) {
      setArea(prevArea => {
        const prevBlock = prevArea[oItem.id];
        return {
          ...prevArea,
          [oItem.id]: {
            ...prevBlock,
            isFlag: !prevBlock.isFlag,
          },
        };
      });
    }
  };

  const onPressBlock = (oItem: IAreaCell) => {
    if (!oItem.isOpen) {
      const block = area[oItem.id];
      console.log('tap', oItem.x, oItem.y, block);
      if (!block) {
        return;
      }

      let y = oItem.y;
      let x = oItem.x;

      block.isFlag = false;
      if (oItem.isBomb) {
        const areaValues = Object.values(area);
        for (let i = 0; i < areaValues.length; i++) {
          areaValues[i].isOpen = true;
        }
        setFinish(GameState.LOOSE);
      } else if (!oItem.isFlag) {
        block.open();
        let len = 0;
        setArea(prevArea => {
          const prevBlock = prevArea[oItem.id];
          return {
            ...prevArea,
            [oItem.id]: {
              ...prevBlock,
              isOpen: true,
            },
          };
        });

        Object.values(area).forEach(item => {
          if (!item.isOpen) {
            len++;
          }
        });

        if (len === bombs && finish === 0) {
          setFinish(GameState.WIN);
        }
        if (!oItem.isBomb && oItem.innerValue === 0) {
          for (let k = 0; k < 9; k++) {
            let id = `${y - (Math.floor(k / 3) - 1)}_${x - ((k % 3) - 1)}`;
            let block = area[id];

            if (block && !block.isFlag) {
              onPressBlock(block);
            }
          }
        }
      }
    }
  };

  const generateGame = () => {
    const [areaArray, bombsCount] = generateArea(complexity);
    setBombs(bombsCount);
    setArea(areaArray);
    setFinish(0);
  };

  useEffect(() => {
    if (finish === -1) {
      generateGame();
    }
  }, [finish]);

  const reset = () => setFinish(-1);

  return {bombs, area, onSetFlag, onPressBlock, reset};
};

export default useMineArea;
