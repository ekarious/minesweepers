<script lang="ts">
  import Tile from '$lib/components/Tile.svelte';
  import {
    boardData,
    boardMinesCount,
    boardRevealed,
    boardSize,
    gameDifficulty,
    gameState,
    score,
    timer
  } from '$stores/game';
  import { tilesGenerator } from '$lib/utils/tiles';
  import { onDestroy } from 'svelte';

  let unsubscribe;

  unsubscribe = gameDifficulty.subscribe(value => {
    boardData.set([]);

    if (value === 'easy') {
      boardSize.set({ x: 10, y: 10 });
    }

    if (value === 'normal') {
      boardSize.set({ x: 18, y: 18 });
    }

    if (value === 'hard') {
      boardSize.set({ x: 25, y: 25 });
    }

    setTimeout(() => {
      const bData = tilesGenerator($boardSize.x, $boardSize.y, $gameDifficulty === 'custom', $boardMinesCount);
      boardData.set(bData.tiles);
      boardMinesCount.set(bData.minesCount);
    }, 0)
  });

  unsubscribe = gameState.subscribe(value => {
    if (value === 'unloaded') {
      timer.reset();
      // score.set(0);
      boardRevealed.set(false);
    }

    if (value === 'ready') {
      timer.reset();
      // score.set(0);
      boardRevealed.set(false);
      const bData = tilesGenerator($boardSize.x, $boardSize.y, $gameDifficulty === 'custom', $boardMinesCount);
      boardData.set(bData.tiles);
      boardMinesCount.set(bData.minesCount);
    }

    if (value === 'ongoing') {
      timer.start();
      boardRevealed.set(false);
    }

    if (value === 'lost') {
      boardRevealed.set(true);
      timer.stop();
    }

    if (value === 'won') {
      timer.stop();
      boardRevealed.set(true);
    }

    boardData.set($boardData);
  })

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });
</script>

<div
  id="board"
  style="--x: {$boardSize.x}; --y: {$boardSize.y}"
  class:disabled={$gameState === 'won' || $gameState === 'lost'}
>
  {#each $boardData as tile (tile.id)}
    <Tile id={tile.id} {tile} />
  {/each}
</div>

<style lang="scss">
  #board {
    display: grid;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    grid-template-columns: repeat(var(--x), 1fr);
    grid-template-rows: repeat(var(--y), 1fr);
    border: 1px solid lightgray;

    &.disabled {
      pointer-events: none;
    }
  }
</style>