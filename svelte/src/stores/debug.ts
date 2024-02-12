import { writable, type Writable } from 'svelte/store';
import type { PanePosition } from 'svelte-tweakpane-ui'

export const debugPanelEnabled = writable(true);
export const debugPanelPosition: Writable<PanePosition> = writable('fixed');
