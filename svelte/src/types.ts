export type gameDifficulties = 'easy' | 'normal' | 'hard' | 'custom';
export type gameStates = 'unloaded' | 'ready' | 'ongoing' | 'won' | 'lost';

export type Tile = {
  id: number;
  x: number;
  y: number;
  isRevealed: boolean;
  isFlagged: boolean;
  hasMine: boolean;
  adjacentTiles: Tile[];
  adjacentMines: number;
}
