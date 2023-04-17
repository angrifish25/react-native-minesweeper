import {IAreaCell} from '../types';

export default class AreaCell implements IAreaCell {
  x;
  y;
  innerValue = null;
  isBomb: boolean = false;
  isOpen: boolean = false;
  isFlag: boolean = false;
  id: string;

  constructor(props: IAreaCell) {
    const { isBomb, x, y } = props;

    this.id = `${y}_${x}`;
    this.x = x;
    this.isBomb = isBomb;
    this.y = y;
  }

  open = () => {
    this.isOpen = true;
  };

  toggleFlag = () => {
    this.isFlag = !this.isFlag;
  };
}
