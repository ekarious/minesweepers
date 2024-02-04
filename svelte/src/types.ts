export type gameDifficulties = 'easy' | 'normal' | 'hard' | 'custom';
export type gameStates = 'ready' | 'ongoing' | 'paused' | 'won' | 'lost';

export type Tile = {
  id: number;
  x?: number;
  y?: number;
  isRevealed: boolean;
  isFlagged: boolean;
  hasMine: boolean;
}
