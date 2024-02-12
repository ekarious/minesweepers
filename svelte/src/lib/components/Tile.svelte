<script lang="ts">
  import { colors, boardRevealed, showTilesID, gameState, boardData, score } from '$stores/game';
  import mine from '../../assets/mine.png';
  import flag from '../../assets/flag.png';
  import type { Tile } from '../../types';
  import { revealAdjacentTiles } from '$lib/utils/tiles';

  export let id: number;
  export let tile: Tile;

  function handleOnClick() {
    if ($gameState === 'ready') {
      gameState.set('ongoing');
    }

    if (tile.isRevealed) {
      return;
    }

    if (tile.hasMine) {
      gameState.set('lost');
      return;
    }

    tile.isRevealed = true;
    tile.isFlagged = false;
    // score.increment();

    if (tile.adjacentMines === 0) {
      revealAdjacentTiles(tile);
    }

    // To trigger the rerender of the board after everything has changed.
    boardData.set($boardData);
  }

  function handleOnRightClick() {
    if (tile.isRevealed) {
      return;
    }

    tile.isFlagged = !tile.isFlagged;

    // To trigger the rerender of the board after everything has changed.
    boardData.set($boardData);
  }

  function handleOnDblClick() {
    if (tile.adjacentMines === 0) {
      return;
    }

    const flaggedTiles: number = tile.adjacentTiles.filter(x => x.isFlagged).length;

    if (tile.adjacentMines === flaggedTiles) {
      tile.adjacentTiles.forEach(item => {
        if (item.isFlagged && !item.hasMine) {
          gameState.set('lost');
          return;
        }

        revealAdjacentTiles(item);
      })

      // To trigger the rerender of the board after everything has changed.
      boardData.set($boardData);
    }
  }
</script>

<div class="tile"
     style="
        --color-tile-normal: {$colors.tiles.normal};
        --color-tile-revealed: {$colors.tiles.revealed};
        --color-tile-outline: {$colors.tiles.outline};
        --color-tile-outline-hover: {$colors.tiles.outlineHover};
        --color-success: {$colors.success};
        --color-failure: {$colors.failure};
     "
     class:normal={!tile.isRevealed}
     class:revealed={tile.isRevealed}
     class:won={tile.hasMine && $gameState === 'won'}
     class:lost={tile.hasMine && $gameState === 'lost'}
     on:click|preventDefault={handleOnClick}
     on:contextmenu|preventDefault={handleOnRightClick}
     on:dblclick|preventDefault={handleOnDblClick}
>
  {#if $boardRevealed}
    {#if tile.hasMine}
      <img src={mine} alt="mine image" />
    {:else}
      {#if tile.adjacentMines !== 0 && !$showTilesID}
        {#if tile.adjacentMines !== 0}
          {tile.adjacentMines}
        {/if}
      {:else if $showTilesID}
        {id}
      {/if}
    {/if}
  {:else}
    {#if tile.isRevealed}
      {#if tile.hasMine}
        <img src={mine} alt="mine image" />
      {:else}
        {#if tile.adjacentMines !== 0}
          {tile.adjacentMines}
        {/if}
      {/if}
    {:else}
      {#if tile.isFlagged}
        <img src={flag} alt="mine image" />
      {/if}
    {/if}
  {/if}
</div>

<style lang="scss">
  .tile {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    cursor: pointer;
    user-select: none;
    outline: 1px dashed var(--color-tile-outline);

    &:hover {
      z-index: 10;
      outline: 1px dashed var(--color-tile-outline-hover);
      outline-offset: -1px;
    }

    &.normal {
      background-color: var(--color-tile-normal);
    }

    &.revealed {
      background-color: var(--color-tile-revealed) !important;
    }

    &.won {
      fill: var(--color-success) !important;
    }

    &.lost {
      fill: var(--color-failure) !important;
    }
  }

</style>