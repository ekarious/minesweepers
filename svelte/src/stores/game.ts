import { derived, readable, type Writable, writable } from 'svelte/store';
import type { gameStates, gameDifficulties, Tile } from '../types';

export const gameDifficulty: Writable<gameDifficulties> = writable('easy');
export const gameState: Writable<gameStates> = writable('ready');

// Board & Tiles
export const boardSize: Writable<{ x: number; y: number }> = writable({ x: 10, y: 10 });
export const boardData: Writable<Tile[]> = writable([]);
export const flaggedTiles = derived(boardData, ($boardData) => $boardData.filter(x => x.isFlagged));
export const revealedTiles = derived(boardData, ($boardData) => $boardData.filter(x => x.isRevealed));
export const boardMinesCount = writable(0);
export const showTilesID = writable(false)


export const boardRevealed = writable(false);


export const colors = writable({
  success: '#64db98',
  failure: '#fa5161',
  tiles: {
    normal: '#f2f2f2',
    revealed: '#ffffff',
    mine: '#fa5161',
    outline: '#d8d8d8',
    outlineHover: '#000000'
  }
});

function createTimer() {
  const { subscribe, set, update } = writable(0);
  let unsubscribe: any;

  const time = readable(0, function start(setTime) {
    const beginning = new Date();
    const beginningTime = beginning.getTime();

    const interval = setInterval(() => {
      const current = new Date();
      const currentTime = current.getTime();
      setTime(currentTime - beginningTime);
    }, 1000);

    return function stop() {
      setTime(0);
      clearInterval(interval);
    };
  });

  return {
    subscribe,
    set,
    update,
    start: () => unsubscribe = time.subscribe(t => set(t)),
    stop: () => {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
    },
    reset: () => {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      set(0);
    }
  };
}

export const timer = createTimer();

export const score = derived([flaggedTiles, revealedTiles, boardSize], ([$flaggedTiles, $revealedTiles, $boardSize]) => {
  if ($flaggedTiles.length + $revealedTiles.length === ($boardSize.x * $boardSize.y)) {
    gameState.set('won');
    return $flaggedTiles.length + $revealedTiles.length;
  }
  return $revealedTiles.length;
});
