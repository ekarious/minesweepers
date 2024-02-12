import type { Tile } from '../../types';
import { getRandomIntFromArray } from '$lib/utils/numbers';

export const randomNbMines = (totalTiles: number): number => {
  return Math.floor(Math.random() * (totalTiles * 0.2 - totalTiles * 0.08 + 1)) + totalTiles * 0.1;
};

export const tilesGenerator = (x: number, y: number, customMines: boolean = false, nbMines: number = 0) => {
  const recommendedNbMines: number = randomNbMines(x * y);
  let minesCount: number = customMines ? nbMines : recommendedNbMines;
  let minesIds: number[];

  // Create Array of tiles
  const tiles: Tile[] = Array.from({ length: x * y }, (_, index) => {
    const tileCoords = getTileCoords({ x, y }, index);

    return {
      x: tileCoords.x || 0,
      y: tileCoords.y || 0,
      id: index,
      isRevealed: false,
      isFlagged: false,
      hasMine: false,
      adjacentTiles: [],
      adjacentMines: 0
    };
  });

  // Add mines at random
  minesIds = getRandomIntFromArray(tiles.map(tile => tile.id), minesCount);
  minesIds.forEach(id => tiles[id].hasMine = true);

  // Set adjacentTiles per tiles.
  // And set adjacentMinesCount !
  tiles.forEach(tile => {
    // top
    if (tile.y > 0) {
      tile.adjacentTiles.push(tiles[tile.id - x]);
    }

    // bottom
    if (tile.y < y - 1) {
      tile.adjacentTiles.push(tiles[tile.id + x]);
    }

    // left
    if (tile.x > 0) {
      tile.adjacentTiles.push(tiles[tile.id - 1]);
    }

    // right
    if (tile.x < x - 1) {
      tile.adjacentTiles.push(tiles[tile.id + 1]);
    }

    // top - left
    if (tile.y > 0 && tile.x > 0) {
      tile.adjacentTiles.push(tiles[tile.id - (x + 1)]);
    }

    // top - right
    if (tile.y > 0 && tile.x < x - 1) {
      tile.adjacentTiles.push(tiles[tile.id - (x - 1)]);
    }

    // bottom - right
    if (tile.y < y - 1 && tile.x < x - 1) {
      tile.adjacentTiles.push(tiles[tile.id + (x + 1)]);
    }

    // bottom - left
    if (tile.y < y - 1 && tile.x > 0) {
      tile.adjacentTiles.push(tiles[tile.id + (x - 1)]);
    }

    // AdjacentMines count !
    if (!tile.hasMine) {
      tile.adjacentMines = tile.adjacentTiles.filter(m => m.hasMine).length;
    }
  });

  return {
    tiles,
    minesCount
  };
};

export function getTileCoords(boardSize: { x: number, y: number }, id: number): { x: number, y: number } {
  const vertical = (id % boardSize.x);
  const horizontal = Math.ceil((id - 1 - vertical) / boardSize.x);
  return { x: vertical, y: horizontal };
}

export function revealAdjacentTiles(tile: Tile, recursive: boolean = true): void {
  tile.adjacentTiles.forEach(item => {
    if (item.hasMine || item.isRevealed || item.isFlagged) {
      return;
    }

    item.isRevealed = true;

    if (item.adjacentMines === 0 && recursive) {
      revealAdjacentTiles(item);
    }
  });
}

