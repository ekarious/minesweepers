<script lang="ts">
  import '../style.scss';
  import Debug from '$lib/Debug.svelte';
  import Board from '$lib/components/Board.svelte';
  import Timer from '$lib/components/Timer.svelte';
  import Score from '$lib/components/Score.svelte';
  import { debugPanelEnabled } from '$stores/debug';

  function toggleDebug() {
    debugPanelEnabled.update(x => !x);
  }

  function handleReset(event) {
    console.log('dispatched: timerReset', event)
  }
</script>

<svelte:head>
  <title>Minesweeper</title>
</svelte:head>

{#if $debugPanelEnabled}
  <Debug />
{/if}

<header>
  <h1>Minesweeper</h1>
  <Timer />
  <Score />
</header>
<main>
  <Board />
</main>
<footer>
  <div>
    <p>Copyright 2024 &copy;
      <a href="https://www.yannschmidt.com" target="_blank">Yann Schmidt</a> &bull;
      <a href="https://github.com/ekarious/minesweepers/svelte">Source code</a> &bull; version 0.0.1 &bull; Made with Svelte
    </p>
  </div>
  <div>
    <p>
      <button on:click={toggleDebug}>debug</button>
    </p>
  </div>
</footer>

<style lang="scss">
  header {
    text-align: center;
  }

  footer {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 8px 20px 4px 20px;
    width: calc(100% - 40px);
    color: #b6bdc2;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #666;

      a, button {
        color: #666;
      }
    }

    a, button {
      color: #b6bdc2;
      text-decoration: none;
      transition: color 0.3s ease-in-out;

      &:hover {
        text-decoration: underline;
        color: #000;
      }
    }

    p {
      font-size: 0.8em;
      margin: 5px 0;

      button {
        background: transparent;
        border: none;
        cursor: pointer;
      }
    }
  }


</style>
