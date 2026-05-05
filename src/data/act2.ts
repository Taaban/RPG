import type { Scene } from '../types/game';

export const act2Scenes: Record<string, Scene> = {
  battle_1_win: {
    id: 'battle_1_win',
    speaker: 'Aria',
    text: 'You did it! The Shadow-Wisp has dissipated into pure Aether. Look, it left behind a Memory Shard.',
    choices: [
      { text: 'Pick it up.', nextSceneId: 'spire_arrival', action: { type: 'GAIN_ITEM', payload: 'crystal_shard' } },
    ],
  },
  spire_arrival: {
    id: 'spire_arrival',
    speaker: 'Narrator',
    text: 'You arrive at the base of the Crystal Spire. It pulses with a faint, rhythmic light, like a dying heartbeat.',
    choices: [
      { text: 'Enter the Spire.', nextSceneId: 'spire_interior' },
      { text: 'Look around first.', nextSceneId: 'spire_exterior' },
    ],
  },
  spire_exterior: {
    id: 'spire_exterior',
    speaker: 'Aria',
    text: 'The architecture here... it was built to amplify memories. If we can reach the top, we might be able to broadcast a Song of Restoration.',
    choices: [
      { text: 'Let\'s go inside.', nextSceneId: 'spire_interior' },
    ],
  },
  spire_interior: {
    id: 'spire_interior',
    speaker: 'Aria',
    text: 'Wait. Do you feel that? The air is thick with Resonance. There is an Altar of Weaving ahead.',
    choices: [
      { text: 'Approach the Altar.', nextSceneId: 'altar_weaving' },
    ],
  },
  altar_weaving: {
    id: 'altar_weaving',
    speaker: 'Narrator',
    text: 'The Altar hums as you approach. The Shards in your pocket begin to glow.',
    choices: [
      { text: 'Weave a new Echo.', nextSceneId: 'weave_success', action: { type: 'SET_FLAG', payload: 'first_weave' } },
    ],
  },
  weave_success: {
    id: 'weave_success',
    speaker: 'Aria',
    text: 'Incredible. You have woven the shard into a new ability: "Luminescent Burst". It will serve you well against the stronger shadows.',
    choices: [
      { text: 'Test it on the Warden!', nextSceneId: 'warden_combat' },
    ],
  },
  warden_combat: {
    id: 'warden_combat',
    speaker: 'Echo-Warden',
    text: 'NONE SHALL DISTURB THE SILENCE.',
    choices: [
      { text: 'Defend yourself!', nextSceneId: 'battle_2', action: { type: 'TRIGGER_COMBAT', payload: 'echo_warden' } },
    ],
  },
  warden_win: {
    id: 'warden_win',
    speaker: 'Aria',
    text: 'The Warden has fallen. The Spire is ours. We can finally start the Restoration.',
    choices: [
      { text: 'To be continued...', nextSceneId: 'end' },
    ],
  },
  game_over: {
    id: 'game_over',
    speaker: 'The Silence',
    text: 'The memories have faded. There is only... nothing.',
    choices: [
      { text: 'Retry', nextSceneId: 'start' },
    ],
  },
};
