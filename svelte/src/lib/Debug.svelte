<script lang="ts">
  import {
    Folder,
    Pane,
    Checkbox,
    RadioGrid,
    Text,
    Button,
    ButtonGrid,
    List,
    Color,
    type ButtonGridClickEvent, Slider, type ListOptions
  } from 'svelte-tweakpane-ui';
  import { debugPanelEnabled, debugPanelPosition } from '$stores/debug';
  import { type gameStates, type gameDifficulties, gameDifficulty, gameState, score, timer } from '$stores/game';
  import { formatTime } from '$lib/utils/time';
  import { onDestroy } from 'svelte';

  // Game
  const gameDifficulties: ListOptions<gameDifficulties> = {
    Easy: 'easy',
    Normal: 'normal',
    Hard: 'hard',
    Custom: 'custom',
  };

  const gameStates: ListOptions<gameStates> = {
    Ready: 'ready',
    Ongoing: 'ongoing',
    Paused: 'paused',
    Won: 'won',
    Lost: 'lost'
  };

  // Board

  // Tiles

  // Score
  function handleScoreModify(event: ButtonGridClickEvent) {
    const label = event.detail.label;
    label === '+1' ? score.increment() : score.decrement();
  }

  // Timer
  function handleTimerModify(event: ButtonGridClickEvent) {
    const label = event.detail.label;
    label === 'Start' ? timer.start() : timer.stop();
  }

  let humanizedTime: string = '00:00';
  let unsubscribe;

  unsubscribe = timer.subscribe(value => {
    humanizedTime = formatTime(value);
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });

</script>

<Pane position={$debugPanelPosition} title="Debug">
  <!-- Debug Panel Options -->
  <Checkbox bind:value={$debugPanelEnabled} label="Enabled" />
  <RadioGrid bind:value={$debugPanelPosition} columns={2} label="Position" values={['fixed', 'draggable']} />

  <!-- Game -->
  <Folder title="Game" expanded={true}>
    <List bind:value={$gameDifficulty} label="Difficulty" options={gameDifficulties} />
    <List bind:value={$gameState} label="State" options={gameStates} />
  </Folder>

  <!-- Board -->
  <Folder title="Board" expanded={true}>

  </Folder>

  <!-- Tiles -->
  <Folder title="Tiles" expanded={true}>

  </Folder>

  <!-- Score -->
  <Folder title="Score" expanded={true}>
    <Slider bind:value={$score} label="Current" min={0} step={1} />
    <ButtonGrid on:click={handleScoreModify} label="Modify" buttons={['+1', '-1']} />
    <Button on:click={score.reset} title="Reset" />
  </Folder>

  <!-- Timer -->
  <Folder title="Timer" expanded={true}>
    <Text bind:value={humanizedTime} label="Current" disabled />
    <ButtonGrid on:click={handleTimerModify} label="Modify" buttons={['Start', 'Stop']} />
    <Button on:click={timer.reset} title="Reset" />
  </Folder>
</Pane>
