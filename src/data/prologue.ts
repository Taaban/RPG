import type { Scene } from '../types/game';

export const prologueScenes: Record<string, Scene> = {
  start: {
    id: 'start',
    speaker: '???',
    text: 'Do you remember the sound of the wind through the crystal spires? Or has the Silence already taken that from you?',
    choices: [
      { text: 'I remember.', nextSceneId: 'remember' },
      { text: 'Everything is... hazy.', nextSceneId: 'hazy' },
    ],
  },
  remember: {
    id: 'remember',
    speaker: 'Aria',
    text: 'Good. Then there is still a thread to pull. I am Aria, a Guardian of the Echoes. The world is unraveling, Weaver.',
    choices: [
      { text: 'How can I help?', nextSceneId: 'help' },
      { text: 'Why me?', nextSceneId: 'why_me' },
    ],
    action: { type: 'SET_FLAG', payload: 'met_aria' },
  },
  hazy: {
    id: 'hazy',
    speaker: 'Aria',
    text: 'That is the Silence at work. It eats the past to hollow out the future. But your hands... they still glow with the Aether.',
    choices: [
      { text: 'What is this light?', nextSceneId: 'light' },
      { text: 'It feels... warm.', nextSceneId: 'warm' },
    ],
  },
  help: {
    id: 'help',
    speaker: 'Aria',
    text: 'We must reach the Spire of Echoes. But the path is guarded by those who have lost their song.',
    choices: [
      { text: 'I am ready.', nextSceneId: 'first_combat_intro' },
    ],
  },
  // Placeholder for combat transition
  first_combat_intro: {
    id: 'first_combat_intro',
    speaker: 'Aria',
    text: 'Look out! A Shadow-Wisp! It feeds on forgotten thoughts.',
    choices: [
      { text: 'Prepare for battle!', nextSceneId: 'battle_1', action: { type: 'TRIGGER_COMBAT', payload: 'shadow_wisp' } },
    ],
  },
  // We need a scene for 'battle_1' even if it's just a transition
  battle_1: {
    id: 'battle_1',
    speaker: 'Combat',
    text: 'Combat in progress...',
    choices: [],
  },
  battle_2: {
    id: 'battle_2',
    speaker: 'Combat',
    text: 'Combat in progress...',
    choices: [],
  },
};
