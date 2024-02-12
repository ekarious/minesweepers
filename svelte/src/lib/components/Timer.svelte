<script lang="ts">
  import { formatTime } from '$lib/utils/time'
  import { colors, gameState, timer } from '$stores/game';
  import { onDestroy } from 'svelte';

  let humanizedTime: string = '00:00';
  let unsubscribe;

  unsubscribe = timer.subscribe(value => {
    humanizedTime = formatTime(value);
  })

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });
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
  {humanizedTime}
</div>

<style lang="scss">
  div {
    font-size: 1.5rem;
    color: #b6bdc2;
    transition: color 0.3s ease-in-out;

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
