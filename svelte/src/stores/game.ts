import { derived, readable, type Writable, writable } from 'svelte/store';
import type { gameStates, gameDifficulties, Tile } from '../types';
import { randomNbMines } from '$lib/utils/tiles';

export const gameDifficulty: Writable<gameDifficulties> = writable('easy');
export const gameState: Writable<gameStates> = writable('ready');

export const isGamePaused = derived(gameState, ($gameState) => $gameState === 'paused');

// Board & Tiles
export const boardSize: Writable<{ x: number; y: number }> = writable({ x: 10, y: 10 });
export const boardData: Writable<Tile[]> = writable([]);
export const boardMinesCount = writable(0);

export const tileHover: Writable<Tile | null> = writable(null);

export const colors = writable({
  success: '#64db98',
  failure: '#fa5161',
  tiles: {
    odd: '#dcc6e6',
    even: '#b8dbf2'
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
    pause: () => {
    },
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

function createScore() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update(n => n + 1),
    decrement: () => update(n => n <= 0 ? 0 : n - 1),
    reset: () => set(0),
    set,
    update
  };
}

export const score = createScore();

