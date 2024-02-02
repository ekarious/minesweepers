import { readable, type Writable, writable } from 'svelte/store';

export const gameDifficulty: Writable<gameDifficulties> = writable('easy');
export const gameState: Writable<gameStates> = writable('ready');

export type gameDifficulties = 'easy' | 'normal' | 'hard' | 'custom';
export type gameStates = 'ready' | 'ongoing' | 'paused' | 'won' | 'lost';

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
    pause: () => {},
    stop: () => {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
    },
    reset: () => {
      if (unsubscribe) {
        stop();
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

