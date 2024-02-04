import type { Tile } from '../../types';
import { getRandomIntFromArray } from '$lib/utils/numbers';

export const randomNbMines = (totalTiles: number): number => {
  return Math.floor(Math.random() * (totalTiles * 0.3 - totalTiles * 0.1 + 1)) + totalTiles * 0.1;
};

export const tilesGenerator = (x: number, y: number, customMines: boolean = false, nbMines: number = 0) => {
  const recommendedNbMines: number = randomNbMines(x * y);
  let minesCount: number = customMines ? nbMines : recommendedNbMines;
  let minesIds: number[];

  // Create Array of tiles
  const tiles: Tile[] = Array.from({ length: x * y }, (_, index) => {
    const tileCoords = getTileCoords({x, y}, index);
    console.log(x, y, tileCoords);

    return {
      x: tileCoords.x || 0,
      y: tileCoords.y || 0,
      id: index,
      isRevealed: false,
      isFlagged: false,
      hasMine: false
    };
  });

  minesIds = getRandomIntFromArray(tiles.map(tile => tile.id), minesCount);
  minesIds.forEach(id => tiles[id].hasMine = true);

  return {
    tiles,
    minesCount
  };
};

export function getTileCoords(boardSize: { x: number, y: number }, id: number): { x: number, y: number } {
  const vertical = (id % boardSize.x);
  const horizontal = Math.ceil((id - 1 - vertical) / boardSize.x);
  return { x: vertical, y: horizontal }
}

export function getAdjacentTiles(boardSize: { x: number, y: number }, tile: Tile) {

}
