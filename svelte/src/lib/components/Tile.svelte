<script lang="ts">
  import { colors, tileHover } from '$stores/game';
  import type { Tile } from '../../types';

  export let id: number;
  export let tile: Tile;

</script>

<div class="tile"
     class:mine={tile.hasMine}
     on:click={() => console.log('clicked', tile)}
     on:dblclick={() => console.log('dblclick', tile)}
     on:mouseenter={() => tileHover.set(tile)}
     on:mouseleave={() => tileHover.set(null)}
>
  {id}
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

    p {
      visibility: hidden;
      cursor: default;
      user-select: none;
      font-size: 1.2rem;
    }

    &:hover {
      outline: 1px dashed #212121;
      outline-offset: -1px;
    }

    &.mine {
      background-color: #fa5161 !important;
      background-repeat: no-repeat;
      background-size: cover;
    }

    &.color1 {
      background-color: #b8dbf2;
    }

    &.color2 {
      background-color: #dcc6e6;
    }

    &.flagged {
      background-image: url("$lib/assets/flag.png");
      background-repeat: no-repeat;
      background-size: cover;
    }

    &.revealed {
      background: aliceblue !important;
      cursor: auto;

      p {
        visibility: initial;
      }
    }

    &.success {
      background-color: darken(#b7eecf, 20%) !important;
    }

    &.failure {
      background-color: darken(#fdb4bb, 20%) !important;
      background-image: url("$lib/assets/mine.png");
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

</style>