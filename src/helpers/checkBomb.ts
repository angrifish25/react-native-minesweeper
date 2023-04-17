export default function checkBomb(key: string, area: Object) {
  const block = area[key];
  return block ? (block.isBomb ? 1 : 0) : 0;
}
