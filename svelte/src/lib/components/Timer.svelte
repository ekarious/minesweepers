<script lang="ts">
  import { formatTime } from '$lib/utils/time'
  import { timer } from '$stores/game';
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

<div>
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

    &.stopped {
      color: darken(#fdb4bb, 20%);
    }

    &.success {
      color: darken(#b7eecf, 20%) !important;
    }
  }
</style>
