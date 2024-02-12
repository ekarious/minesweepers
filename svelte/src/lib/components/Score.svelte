<script lang="ts">
  import { colors, gameState, score } from '$stores/game';
</script>

<div
  style="
    --color-success: {$colors.success};
    --color-failure: {$colors.failure};
  "
  class:active={$gameState === 'ongoing'}
  class:won={$gameState === 'won'}
  class:lost={$gameState === 'lost'}
>
  {$score}
</div>

<style lang="scss">
  div {
    position: fixed;
    left: 0;
    top: 0;
    padding-left: 20px;
    padding-top: 20px;
    font-size: 1.5rem;
    color: #b6bdc2;
    transition: color 0.3s ease-in-out;
    text-align: right;

    &.active {
      color: #000;
    }

    &.won {
      color: var(--color-success);
    }

    &.lost {
      color: var(--color-failure);
    }
  }
</style>
